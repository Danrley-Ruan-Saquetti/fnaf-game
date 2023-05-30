export interface IAnimatronic {
    active: boolean
    name: string
    currentPosition: { position: number, path: number }
    progress: { position: number, paths: { path: number, attack?: boolean }[] }[]
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
