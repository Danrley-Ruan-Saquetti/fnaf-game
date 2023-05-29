import { IAnimatronic } from "./animatronic"
import { ICamera } from "./camera"
import { IDesk, TLight, TPort } from "./desk"

export interface IRepositoryDataGame {
    animatronics: IAnimatronic[]
    desk: IDesk
    nigth: number
}

export interface TRepositoryGame {
    data: IRepositoryDataGame;
    reset: () => void;
    start: (dataStart: IRepositoryDataGame) => void;
    getPort: ({ code }: {
        code: string;
    }) => {
        port: TPort | null;
    };
    getIndexByPort: ({ code }: {
        code: string;
    }) => {
        index: number;
    };
    updatePort: ({ where, port, }: {
        where: {
            code: string;
        };
        port: TPort;
    }) => void;
    getLight: ({ code }: {
        code: string;
    }) => {
        light: TLight | null;
    };
    getIndexByLight: ({ code }: {
        code: string;
    }) => {
        index: number;
    };
    updateLight: ({ where, light, }: {
        where: {
            code: string;
        };
        light: TLight;
    }) => void;
    getAnimatronic: ({ name }: {
        name: string;
    }) => {
        animatronic: IAnimatronic | null;
    };
    getIndexByAnimatronic: ({ name }: {
        name: string;
    }) => {
        index: number;
    };
    updateAnimatronic: ({ where, animatronic, }: {
        where: {
            name: string;
        };
        animatronic: IAnimatronic;
    }) => void;
    updateCamera: ({ camera }: {
        camera: ICamera;
    }) => void;
    updateBattery: ({ battery }: {
        battery: number;
    }) => void;
    updateHour: ({ hour }: {
        hour: number;
    }) => void;
};