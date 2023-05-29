import { IEvent, IEventTypes, IEventData } from './../@types/event'
import { ObserverEvent } from './../@types/observer.d'
import { randomId } from './random-id.js'

export function ObserverEvent(): ObserverEvent {
    const listeners: ObserverEvent['listeners'] = []

    const on: ObserverEvent['on'] = <E extends IEventTypes>(
        evt: E,
        handler: <T extends IEventData<E>>(data: IEvent<T>) => void,
        main?: boolean
    ) => {
        const code = randomId()

        // @ts-expect-error
        listeners.push({ evt, handler, code, main })

        return code
    }

    const emit: ObserverEvent['emit'] = <
        U extends IEventTypes,
        T extends IEventData<U>
    >(
        evt: U,
        data: IEvent<T>
    ) => {
        listeners
            .filter((_obs) => {
                return _obs.evt == evt
            })
            .forEach((_obs) => {
                setTimeout(() => {
                    _obs.handler(data)
                }, 1)
            })
    }

    const removeListener: ObserverEvent['removeListener'] = (code) => {
        const index = listeners.findIndex((obs) => obs.code == code)

        if (index < 0) {
            return
        }

        listeners.splice(index, 1)
    }

    const clearListeners: ObserverEvent['clearListeners'] = (all) => {
        if (all) {
            return listeners.splice(0, listeners.length)
        }

        return listeners.filter((ev) => ev.main).splice(0, listeners.length)
    }

    return {
        on,
        emit,
        removeListener,
        listeners,
        clearListeners,
    }
}
