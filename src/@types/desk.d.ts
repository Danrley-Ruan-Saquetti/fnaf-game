import { ICamera } from './camera'
import { IRecharge } from './game'

export type TLight = IRecharge & {
    code: string
    isOn: boolean
    blocked?: boolean
    toggleIndependent?: boolean
}

export type TPort = IRecharge & {
    code: string
    isOpen: boolean
    blocked?: boolean
    position: number
    toggleIndependent?: boolean
}

export interface IDesk {
    lights: TLight[]
    ports: TPort[]
    camera: ICamera
    battery: number
    hour: number
}