import { ICamera } from '../@types/camera'
import { TLight, TPort } from '../@types/desk'
import { TRepositoryGame } from '../@types/game'
import { ObserverEvent } from '../@types/observer'

export function DeskController(repo: TRepositoryGame, EventGame: { emit: ObserverEvent['emit'] }) {
    // # Util
    const rechargeCamera = ({ camera }: { camera: ICamera }) => {
        repo.updateCamera({ camera: { ...camera, inRecharge: true } })

        setTimeout(() => {
            const { camera } = repo.data.desk

            repo.updateCamera({ camera: { ...camera, inRecharge: false }, })
        }, camera.recharge)
    }

    const rechargePort = ({ port }: { port: TPort }) => {
        repo.updatePort({ where: port, port: { ...port, inRecharge: true } })

        setTimeout(() => {
            const p = repo.getPort(port)

            if (!p) { return console.log('!!!!') }

            repo.updatePort({ where: { code: p.code }, port: { ...p, inRecharge: false }, })
        }, port.recharge)
    }

    const rechargeLight = ({ light }: { light: TLight }) => {
        repo.updateLight({ where: light, light: { ...light, inRecharge: true } })

        setTimeout(() => {
            const l = repo.getLight(light)

            if (!l) { return console.log('!!!!') }

            repo.updateLight({ where: { code: l.code }, light: { ...l, inRecharge: false }, })
        }, light.recharge)
    }

    // # Use Case
    const togglePort = ({ code }: { code: string }) => {
        if (!repo.isRunning()) { return }

        const port = repo.getPort({ code })

        if (!port) { return console.log('!!!!') }

        if (repo.getSettings().desk.ports.toggleDependent && repo.getPortOpenDependent()) { return }

        if (port.inRecharge) { return }

        port.isOpen = !port.isOpen

        repo.updatePort({ where: { code }, port })

        rechargePort({ port })

        const data = { data: port, message: `Port "${code}" ${port.isOpen ? 'open' : 'closed'}`, }

        EventGame.emit('desk/ports/toggle', data)
        port.isOpen && EventGame.emit('desk/ports/open', data)
        !port.isOpen && EventGame.emit('desk/ports/close', data)
    }

    const toggleLight = ({ code }: { code: string }) => {
        if (!repo.isRunning()) { return }

        const light = repo.getLight({ code })

        if (!light) { return console.log('!!!!') }

        if (repo.getSettings().desk.lights.toggleDependent && repo.getLightOpenDependent()) { return }

        light.isOn = !light.isOn

        repo.updateLight({ where: { code }, light })

        rechargeLight({ light })

        const data = { data: light, message: `Light "${code}" ${light.isOn ? 'on' : 'off'}`, }
        EventGame.emit('desk/lights/toggle', data)
        light.isOn && EventGame.emit('desk/lights/on', data)
        !light.isOn && EventGame.emit('desk/lights/off', data)
    }

    const toggleCamera = () => {
        if (!repo.isRunning()) { return }

        const { camera } = repo.data.desk

        if (camera.inRecharge) { return }

        camera.isOpen = !camera.isOpen

        repo.updateCamera({ camera })

        rechargeCamera({ camera })

        const data = { data: camera, message: `Camera ${camera.isOpen ? 'on' : 'off'}`, }
        EventGame.emit('desk/camera/toggle', data)

        /* eslint  no-unused-expressions: ["off"] */
        camera.isOpen && EventGame.emit('desk/camera/open', data)
        !camera.isOpen && EventGame.emit('desk/camera/close', data)
    }

    return {
        togglePort,
        toggleLight,
        toggleCamera,
    }
}
