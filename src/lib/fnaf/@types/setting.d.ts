import { IEventTypes } from './event'

export interface ISettingGame {
    desk: {
        ports: {
            toggleDependent: boolean
        }
        lights: {
            toggleDependent: boolean
        }
    }
    FPS: number,
    FPS_USAGE_BATTERY: number
    log?: IEventTypes[] | boolean
}