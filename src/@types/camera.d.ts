export type TCamera = {
    code: string
    position: number
}

export interface ICamera {
    isOpen: boolean
    cameraActive: number
    map: TCamera[]
}