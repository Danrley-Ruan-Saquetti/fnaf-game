import { ICamera } from "./camera"

export type TLight = {
    code: string
    isOn: boolean
    blocked: boolean
}

export type TPort = {
    code: string
    isOpen: boolean
    blocked: boolean
}

export interface IDesk {
    lights: TLight[]
    ports: TPort[]
    camera: ICamera
    battery: number
    hour: number
}