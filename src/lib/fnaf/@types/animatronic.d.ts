export interface IAnimatronic {
    active: boolean
    name: string
    currentPosition: { position: number, path: number },
    config: {
        retreatPositionsTime: number,
        nights: { night: number, activationTime: number, rates: { advance: number, retreat: number, attack: number } }[]
    },
    mapPath: {
        stage: number,
        position: number,
        paths: { path: number, order: number }[],
        attack?: boolean
    }[]
}
