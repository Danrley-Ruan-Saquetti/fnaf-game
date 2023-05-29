import { IAnimatronic } from "../@types/animatronic";
import { ICamera } from "../@types/camera";
import { TLight, TPort } from "../@types/desk";
import { IRepositoryDataGame, TRepositoryGame } from "../@types/game";

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
            },
            battery: 0,
            hour: 0,
        },
        nigth: 0,
    };

    const reset = () => {
        data.animatronics = [];
        data.desk.lights = [];
        data.desk.ports = [];
        data.desk.camera.isOpen = false;
        data.desk.camera.map = [];
        data.desk.camera.cameraActive = 0;
        data.desk.battery = 0;
        data.desk.hour = 0;
        data.nigth = 0;
    };

    const start = (dataStart: IRepositoryDataGame) => {
        data.animatronics = dataStart.animatronics;
        data.desk.lights = dataStart.desk.lights;
        data.desk.ports = dataStart.desk.ports;
        data.desk.camera.isOpen = dataStart.desk.camera.isOpen;
        data.desk.camera.cameraActive = dataStart.desk.camera.cameraActive;
        data.desk.camera.map = dataStart.desk.camera.map;
        data.desk.battery = dataStart.desk.battery;
        data.desk.hour = dataStart.desk.hour;
        data.nigth = dataStart.nigth;
    };

    // # desk

    // ## Light
    const getLight = ({ code }: { code: string }) => {
        const light = data.desk.lights.find((light) => light.code == code) || null;

        if (!light) {
            console.error(`Light "${code}" not found`);
        }

        return { light };
    };

    const getIndexByLight = ({ code }: { code: string }) => {
        const index = data.desk.lights.findIndex((light) => light.code == code);

        if (index < 0) {
            console.error(`Light "${code}" not found`);
        }

        return { index };
    };

    const updateLight = ({
        where,
        light,
    }: {
        where: { code: string };
        light: TLight;
    }) => {
        const { index } = getIndexByLight(where);

        if (index < 0) {
            return;
        }

        data.desk.lights[index] = { ...light, code: where.code };
    };

    // ## Port
    const getPort = ({ code }: { code: string }) => {
        const port = data.desk.ports.find((port) => port.code == code) || null;

        if (!port) {
            console.error(`Port "${code}" not found`);
        }

        return { port };
    };

    const getIndexByPort = ({ code }: { code: string }) => {
        const index = data.desk.ports.findIndex((port) => port.code == code);

        if (index < 0) {
            console.error(`Port "${code}" not found`);
        }

        return { index };
    };

    const updatePort = ({
        where,
        port,
    }: {
        where: { code: string };
        port: TPort;
    }) => {
        const { index } = getIndexByPort(where);

        if (index < 0) {
            return;
        }

        data.desk.ports[index] = { ...port, code: where.code };
    };

    // ## Animatronic
    const getAnimatronic = ({ name }: { name: string }) => {
        const animatronic =
            data.animatronics.find((anima) => anima.name == name) || null;

        if (!animatronic) {
            console.error(`Animatronic "${name}" not found`);
        }

        return { animatronic };
    };

    const getIndexByAnimatronic = ({ name }: { name: string }) => {
        const index = data.animatronics.findIndex((anima) => anima.name == name);

        if (index < 0) {
            console.error(`Animatronic "${name}" not found`);
        }

        return { index };
    };

    const updateAnimatronic = ({
        where,
        animatronic,
    }: {
        where: { name: string };
        animatronic: IAnimatronic;
    }) => {
        const { index } = getIndexByAnimatronic(where);

        if (index < 0) {
            return;
        }

        data.animatronics[index] = { ...animatronic, name: where.name };
    };

    // ## Camera

    const updateCamera = ({ camera }: { camera: ICamera }) => {
        data.desk.camera = camera;
    };

    // ## Battery

    const updateBattery = ({ battery }: { battery: number }) => {
        data.desk.battery = battery;
    };

    // ## Hour

    const updateHour = ({ hour }: { hour: number }) => {
        data.desk.hour = hour;
    };

    return {
        data,
        reset,
        start,
        getPort,
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
    };
}
