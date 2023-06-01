import { IEventTypes } from "./event"

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
    log?: IEventTypes[] | boolean
}