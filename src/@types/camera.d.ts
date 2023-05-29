import { IRecharge } from './game'

export type TCamera = {
    code: string
    position: number
}

export interface ICamera extends IRecharge {
    isOpen: boolean
    cameraActive: number
    map: TCamera[]
}