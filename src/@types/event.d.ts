import { IAnimatronic } from './animatronic'
import { ICamera } from './camera'
import { TLight, TPort } from './desk'
import { IRepositoryDataGame } from './game'

export interface IEvent<T> {
    data: T
    message: string
}

export type IEventTypes =
    'game/start'
    | 'game/end-game'
    | 'desk/ports/toggle'
    | 'desk/ports/open'
    | 'desk/ports/close'
    | 'desk/lights/toggle'
    | 'desk/lights/on'
    | 'desk/lights/off'
    | 'desk/camera/toggle'
    | 'desk/camera/open'
    | 'desk/camera/close'

export type IEventData<E extends IEventTypes> = E extends 'desk/camera/close'
    ? ICamera
    : E extends 'desk/camera/open'
    ? ICamera
    : E extends 'desk/camera/toggle'
    ? ICamera
    : E extends 'desk/ports/close'
    ? TPort
    : E extends 'desk/ports/open'
    ? TPort
    : E extends 'desk/ports/toggle'
    ? TPort
    : E extends 'desk/lights/off'
    ? TLight
    : E extends 'desk/lights/on'
    ? TLight
    : E extends 'desk/lights/toggle'
    ? TLight
    : E extends 'game/start'
    ? IRepositoryDataGame
    : E extends 'game/end-game'
    ? IRepositoryDataGame
    : IRepositoryDataGame;