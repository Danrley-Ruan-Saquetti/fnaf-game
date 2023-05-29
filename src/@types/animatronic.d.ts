export interface IAnimatronic {
    active: boolean
    name: string
    currentPosition: number
    progress: { position: number, attack?: boolean }[]
    configNights: {
        activationTime: number, night: number, difficulty: {
            advance: number
            retreat: number
            attack: number
        }
    }[]
}