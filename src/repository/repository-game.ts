import { IAnimatronic } from '../@types/animatronic'
import { ICamera } from '../@types/camera'
import { TLight, TPort } from '../@types/desk'
import { IRepositoryDataGame, TRepositoryGame } from '../@types/game'

export function RepositoryGame(): TRepositoryGame {
    const data: IRepositoryDataGame = {
        animatronics: [],
        desk: {
            lights: [],
            ports: [],
            camera: {
                isOpen: false,
                cameraActive: 0,
                map: [],
                recharge: 0,
                inRecharge: false,
            },
            battery: 0,
            hour: 0,
        },
        night: 0,
        running: false,
        settings: {
            FPS: 0,
            desk: {
                ports: { toggleDependent: false },
                lights: { toggleDependent: false },
            },
        },
    }

    // # Game
    const reset = () => {
        data.animatronics = []
        data.desk = {
            lights: [],
            ports: [],
            camera: {
                isOpen: false,
                map: [],
                cameraActive: 0,
                recharge: 0,
                inRecharge: false,
            },
            battery: 0,
            hour: 0,
        }
        data.night = 0
        data.running = false
        data.settings = {
            FPS: 0,
            desk: {
                ports: { toggleDependent: false },
                lights: { toggleDependent: false },
            },
        }
    }

    const start = (dataStart: Omit<IRepositoryDataGame, 'running'>) => {
        data.animatronics = dataStart.animatronics
        data.desk = dataStart.desk
        data.night = dataStart.night
        data.running = true
        data.settings = dataStart.settings
    }

    const end = () => {
        data.running = false
    }

    const isRunning = () => {
        return data.running
    }

    const setNight = (night: number) => {
        data.night = night
    }

    // # desk

    // ## Light
    const getLight = ({ code }: { code: string }) => {
        const light = data.desk.lights.find((light) => light.code == code) || null

        if (!light) {
            console.error(`Light "${code}" not found`)
        }

        return light
    }

    const getIndexByLight = ({ code }: { code: string }) => {
        const index = data.desk.lights.findIndex((light) => light.code == code)

        if (index < 0) {
            console.error(`Light "${code}" not found`)
        }

        return index
    }

    const updateLight = ({
        where,
        light,
    }: {
        where: { code: string };
        light: TLight;
    }) => {
        const index = getIndexByLight(where)

        if (index < 0) {
            return null
        }

        data.desk.lights[index] = { ...light, code: where.code }

        return data.desk.lights[index]
    }

    const getLightOpenDependent = () => {
        return !!data.desk.lights.find(
            (light) => !light.toggleIndependent && light.inRecharge
        )
    }

    // ## Port
    const getPort = ({ code }: { code: string }) => {
        const port = data.desk.ports.find((port) => port.code == code) || null

        if (!port) {
            console.error(`Port "${code}" not found`)
        }

        return port
    }

    const getIndexByPort = ({ code }: { code: string }) => {
        const index = data.desk.ports.findIndex((port) => port.code == code)

        if (index < 0) {
            console.error(`Port "${code}" not found`)
        }

        return index
    }

    const updatePort = ({
        where,
        port,
    }: {
        where: { code: string };
        port: TPort;
    }) => {
        const index = getIndexByPort(where)

        if (index < 0) {
            return null
        }

        data.desk.ports[index] = { ...port, code: where.code }

        return data.desk.ports[index]
    }

    const getPortOpenDependent = () => {
        return !!data.desk.ports.find(
            (port) => !port.toggleIndependent && port.inRecharge
        )
    }

    // ## Animatronic
    const getAnimatronic = ({ name }: { name: string }) => {
        const animatronic =
            data.animatronics.find((anima) => anima.name == name) || null

        if (!animatronic) {
            console.error(`Animatronic "${name}" not found`)
        }

        return animatronic
    }

    const getIndexByAnimatronic = ({ name }: { name: string }) => {
        const index = data.animatronics.findIndex((anima) => anima.name == name)

        if (index < 0) {
            console.error(`Animatronic "${name}" not found`)
        }

        return index
    }

    const updateAnimatronic = ({
        where,
        animatronic,
    }: {
        where: { name: string };
        animatronic: IAnimatronic;
    }) => {
        const index = getIndexByAnimatronic(where)

        if (index < 0) {
            return null
        }

        data.animatronics[index] = { ...animatronic, name: where.name }

        return data.animatronics[index]
    }

    // ## Camera

    const updateCamera = ({ camera }: { camera: ICamera }) => {
        data.desk.camera = camera

        return data.desk.camera
    }

    // ## Battery

    const updateBattery = ({ battery }: { battery: number }) => {
        data.desk.battery = battery

        return data.desk.battery
    }

    // ## Hour

    const updateHour = ({ hour }: { hour: number }) => {
        data.desk.hour = hour

        return data.desk.hour
    }

    // # Setting

    const getSettings = () => {
        return data.settings
    }

    return {
        data,
        reset,
        start,
        getPort,
        setNight,
        getIndexByPort,
        updatePort,
        getLight,
        getIndexByLight,
        updateLight,
        getAnimatronic,
        getIndexByAnimatronic,
        updateAnimatronic,
        updateCamera,
        updateBattery,
        updateHour,
        end,
        isRunning,
        getSettings,
        getPortOpenDependent,
        getLightOpenDependent,
    }
}
