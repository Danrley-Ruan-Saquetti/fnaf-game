declare const animatronic: {
    currentPosition: {
        position: number;
        path: number;
    };
    config: {
        retreatPositionsTime: number;
        nights: {
            night: number;
            activationTime: number;
            rates: {
                advance: number;
                retreat: number;
                attack: number;
            };
        }[];
    };
    mapPath: {
        stage: number;
        position: number;
        paths: {
            path: number;
            order: number;
        }[];
        attack?: boolean;
    }[];
};
type IMapPath = {
    position: number;
    path: number;
    stage: number;
};
declare const getMapPaths: () => {
    [x: number]: IMapPath[];
};
declare const getPathByAnimatronic: () => IMapPath[];
declare const pathsAnima: IMapPath[];
