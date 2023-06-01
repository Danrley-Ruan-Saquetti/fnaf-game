import { ICamera } from '../@types/camera'
import { TLight, TPort } from '../@types/desk'
import { TRepositoryGame } from '../@types/game'
import { ObserverEvent } from '../@types/observer'

export function DeskController(repo: TRepositoryGame, EventGame: { emit: ObserverEvent['emit'] }) {
    // # Util
    const getPortOpenDependent = () => {
        return !!repo.data.desk.ports.find(port => !port.toggleIndependent && port.inRecharge)
    }

    const getPortsClosed = () => {
        return repo.data.desk.ports.filter(port => !port.isOpen)
    }

    const getLightsOn = () => {
        return repo.data.desk.lights.filter(light => light.isOn)
    }

    const rechargeCamera = ({ camera }: { camera: ICamera }) => {
        repo.updateCamera({ camera: { ...camera, inRecharge: true } })

        setTimeout(() => {
            const { camera } = repo.data.desk

            repo.updateCamera({ camera: { ...camera, inRecharge: false } })
        }, camera.recharge)
    }

    const rechargePort = ({ port }: { port: TPort }) => {
        repo.updatePort({ where: port, port: { ...port, inRecharge: true } })

        setTimeout(() => {
            const p = repo.getPort(port)

            if (!p) {
                return console.log('!!!!')
            }

            repo.updatePort({ where: { code: p.code }, port: { ...p, inRecharge: false } })
        }, port.recharge)
    }

    const rechargeLight = ({ light }: { light: TLight }) => {
        repo.updateLight({ where: light, light: { ...light, inRecharge: true } })

        setTimeout(() => {
            const l = repo.getLight(light)

            if (!l) {
                return console.log('!!!!')
            }

            repo.updateLight({ where: { code: l.code }, light: { ...l, inRecharge: false } })
        }, light.recharge)
    }

    // # Use Case
    const togglePort = ({ code }: { code: string }) => {
        if (!repo.isRunning()) {
            return
        }

        if (repo.data.desk.camera.isOpen) {
            return
        }

        const port = repo.getPort({ code })

        if (!port) {
            return console.log('!!!!')
        }

        if (repo.getSettings().desk.ports.toggleDependent && getPortOpenDependent()) {
            return
        }

        if (port.inRecharge) {
            return
        }

        getLightsOn().forEach(light => repoToggleLight({ light, value: false }))

        repoTogglePort({ port, value: !port.isOpen })
    }

    const toggleLight = ({ code }: { code: string }) => {
        if (!repo.isRunning()) {
            return
        }

        if (repo.data.desk.camera.isOpen) {
            return
        }

        const light = repo.getLight({ code })

        if (!light) {
            return console.log('!!!!')
        }

        if (repo.getSettings().desk.lights.toggleDependent && repo.getLightOpenDependent()) {
            return
        }

        getLightsOn().forEach(light => {})

        repoToggleLight({ light, value: !light.isOn })
    }

    const toggleCamera = () => {
        if (!repo.isRunning()) {
            return
        }

        const { camera } = repo.data.desk

        if (camera.inRecharge) {
            return
        }

        camera.isOpen = !camera.isOpen

        repo.updateCamera({ camera })

        rechargeCamera({ camera })

        const data = { data: camera, message: `Camera ${camera.isOpen ? 'on' : 'off'}` }
        EventGame.emit('desk/camera/toggle', data)

        /* eslint  no-unused-expressions: ["off"] */
        camera.isOpen && EventGame.emit('desk/camera/open', data)
        !camera.isOpen && EventGame.emit('desk/camera/close', data)
    }

    // Repo
    const repoToggleLight = ({ light, value }: { light: TLight; value: boolean }) => {
        light.isOn = value

        const lightUpdated = repo.updateLight({ where: light, light })

        if (!lightUpdated) {
            console.log('!!!!')
            return null
        }

        rechargeLight({ light })

        const data = { data: light, message: `Light "${lightUpdated.code}" ${lightUpdated.isOn ? 'on' : 'off'}` }
        EventGame.emit('desk/lights/toggle', data)
        lightUpdated.isOn && EventGame.emit('desk/lights/on', data)
        !lightUpdated.isOn && EventGame.emit('desk/lights/off', data)

        return lightUpdated
    }

    const repoTogglePort = ({ port, value }: { port: TPort; value: boolean }) => {
        port.isOpen = value

        const portUpdated = repo.updatePort({ where: port, port })

        if (!portUpdated) {
            console.log('!!!!')
            return null
        }

        rechargePort({ port })

        const data = { data: port, message: `Port "${portUpdated.code}" ${portUpdated.isOpen ? 'open' : 'closed'}` }
        EventGame.emit('desk/ports/toggle', data)
        portUpdated.isOpen && EventGame.emit('desk/ports/open', data)
        !portUpdated.isOpen && EventGame.emit('desk/ports/close', data)

        return portUpdated
    }

    return {
        togglePort,
        toggleLight,
        toggleCamera,
    }
}
