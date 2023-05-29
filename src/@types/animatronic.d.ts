export interface IAnimatronic {
    active: boolean
    name: string
    currentPosition: number
    progress: { position: number, atack?: boolean }[]
    configNights: {
        activationTime: number, night: number, difficulty: {
            advance: number
            retreat: number
            atack: number
        }
    }[]
}