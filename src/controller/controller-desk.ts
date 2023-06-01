import { ICamera, TCamera } from '../@types/camera'
import { TLight, TPort } from '../@types/desk'
import { TRepositoryGame } from '../@types/game'
import { ObserverEvent } from '../@types/observer'

export function DeskController(repo: TRepositoryGame, EventGame: { emit: ObserverEvent['emit'] }) {
    // # Util
    const getPortOpenDependent = () => {
        return !!repo.getData().desk.ports.find(port => !port.toggleIndependent && port.inRecharge)
    }

    const getLightOpenDependent = () => {
        return !!repo.getData().desk.lights.find(light => !light.toggleIndependent && light.inRecharge)
    }

    const getPortsClosed = (args?: { exclude?: TPort['code'][] }) => {
        return repo.getData().desk.ports.filter(ports => ports.isOpen && (!args || !args.exclude || !args.exclude.includes(ports.code)))
    }

    const getLightsOn = (args?: { exclude?: TLight['code'][] }) => {
        return repo.getData().desk.lights.filter(light => light.isOn && (!args || !args.exclude || !args.exclude.includes(light.code)))
    }

    const rechargeCamera = ({ camera }: { camera: ICamera }) => {
        repo.updateCamera({ camera: { ...camera, inRecharge: true } })

        setTimeout(() => {
            const { camera } = repo.getData().desk

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

        if (repo.getData().desk.camera.isOpen) {
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

        getLightsOn().forEach(l => repoToggleLight({ light: l, value: false }))

        repoTogglePort({ port, value: !port.isOpen })
    }

    const toggleLight = ({ code }: { code: string }) => {
        if (!repo.isRunning()) {
            return
        }

        if (repo.getData().desk.camera.isOpen) {
            return
        }

        const light = repo.getLight({ code })

        if (!light) {
            return console.log('!!!!')
        }

        if (repo.getSettings().desk.lights.toggleDependent && getLightOpenDependent()) {
            return
        }

        getLightsOn({ exclude: [light.code] }).forEach(l => repoToggleLight({ light: l, value: false }))

        repoToggleLight({ light, value: !light.isOn })
    }

    const toggleCamera = () => {
        if (!repo.isRunning()) {
            return
        }

        const { camera } = repo.getData().desk

        if (camera.inRecharge) {
            return
        }

        getLightsOn().forEach(l => repoToggleLight({ light: l, value: false }))

        repoToggleCamera({ camera, value: !camera.isOpen })
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
        /* eslint no-unused-expressions: ["off"] */
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

    const repoToggleCamera = ({ camera, value }: { camera: ICamera; value: boolean }) => {
        camera.isOpen = value

        const cameraUpdated = repo.updateCamera({ camera })

        if (!cameraUpdated) {
            console.log('!!!!')
            return null
        }

        rechargeCamera({ camera })

        const data = { data: camera, message: `Camera ${camera.isOpen ? 'on' : 'off'}` }
        EventGame.emit('desk/camera/toggle', data)
        camera.isOpen && EventGame.emit('desk/camera/open', data)
        !camera.isOpen && EventGame.emit('desk/camera/close', data)

        return cameraUpdated
    }

    return {
        togglePort,
        toggleLight,
        toggleCamera,
    }
}
