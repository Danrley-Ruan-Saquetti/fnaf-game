import { IEventTypes, IEvent, IEventData } from './event'

export type TObserver = { handler: <T>(data: IEvent<T>) => void; evt: IEventTypes; code: number, main?: boolean }

export interface ObserverEvent {
    on: <E extends IEventTypes>(evt: E, handler: <T extends IEventData<E>>(data: IEvent<T>) => void, main?: boolean) => number
    emit: <U extends IEventTypes, T extends IEventData<U>>(evt: U, data: IEvent<T>) => void
    removeListener: (code: number) => void
    clearListeners: (main?: boolean) => void
    listeners: TObserver[]
}

// function test<E extends IEventTypes>(evt: E, handler: <T extends IEventData<E>>(data: IEvent<T>) => void) {}