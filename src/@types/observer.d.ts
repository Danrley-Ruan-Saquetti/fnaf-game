import { IEvent } from './event.d';
import { IEventTypes } from "./event";

export type TObserver = { handler: <T>(data: IEvent<T>) => void; evt: string; code: number }

export interface ObserverEvent {
    on: (evt: IEventTypes, handler: <T>(data: IEvent<T>) => void) => number
    emit: <T>(evt: IEventTypes, data: IEvent<T>) => void
    removeListener: (code: number) => void
}