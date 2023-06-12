import { ICamera } from './camera'
import { IRecharge } from './game'

export type TLight = IRecharge & {
    code: string
    isOn: boolean
    blocked?: boolean
    toggleIndependent?: boolean
    position: number
    config: {
        toggleIndependentOfPort?: boolean
        usage: number
    }
}

export type TPort = IRecharge & {
    code: string
    isOpen: boolean
    blocked?: boolean
    position: number
    toggleIndependent?: boolean
    config: {
        usage: number
    }
}

export interface IDesk {
    lights: TLight[]
    ports: TPort[]
    camera: ICamera
    battery: number
    hour: number
}