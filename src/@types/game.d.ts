import { IAnimatronic } from "./animatronic"
import { ICamera } from "./camera"
import { IDesk, TLight, TPort } from "./desk"

export interface IRepositoryDataGame {
    animatronics: IAnimatronic[]
    desk: IDesk
    night: number
}

export interface TRepositoryGame {
    data: IRepositoryDataGame;
    reset: () => void;
    start: (dataStart: IRepositoryDataGame) => void;
    getPort: ({ code }: {
        code: string;
    }) => TPort | null;
    getIndexByPort: ({ code }: {
        code: string;
    }) => number;
    updatePort: ({ where, port, }: {
        where: {
            code: string;
        };
        port: TPort;
    }) => TPort | null
    getLight: ({ code }: {
        code: string;
    }) => TLight | null;
    getIndexByLight: ({ code }: {
        code: string;
    }) => number;
    updateLight: ({ where, light, }: {
        where: {
            code: string;
        };
        light: TLight;
    }) => TLight | null
    getAnimatronic: ({ name }: {
        name: string;
    }) => IAnimatronic | null;
    getIndexByAnimatronic: ({ name }: {
        name: string;
    }) => number;
    updateAnimatronic: ({ where, animatronic, }: {
        where: {
            name: string;
        };
        animatronic: IAnimatronic;
    }) => IAnimatronic | null
    updateCamera: ({ camera }: {
        camera: ICamera;
    }) => ICamera;
    updateBattery: ({ battery }: {
        battery: number;
    }) => number;
    updateHour: ({ hour }: {
        hour: number;
    }) => number;
};