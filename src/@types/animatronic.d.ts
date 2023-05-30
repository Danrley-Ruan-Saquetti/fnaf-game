export interface IAnimatronic {
    active: boolean
    name: string
    currentPosition: { position: number, path: number }
    mapPath: { position: number, attack?: boolean, paths: { path: number, order: number }[] }[]
    config: {
        nights: {
            night: number,
            activationTime: number,
            rates: {
                advance: number
                retreat: number
                attack: number
            }
        }[]
    }
}
