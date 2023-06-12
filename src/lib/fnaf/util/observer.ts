import { IEvent, IEventTypes, IEventData } from './../@types/event'
import { ObserverEventModel } from './../@types/observer.d'
import { randomId } from './random-id.js'

export function ObserverEvent(): ObserverEventModel {
    const listeners: ObserverEventModel['listeners'] = []

    const on: ObserverEventModel['on'] = <E extends IEventTypes>(evt: E, handler: <T extends IEventData<E>>(data: IEvent<T>) => void, main?: boolean) => {
        const code = randomId()

        // @ts-expect-error
        listeners.push({ evt, handler, code, main })

        return code
    }

    const emit: ObserverEventModel['emit'] = <U extends IEventTypes, T extends IEventData<U>>(evt: U, data: IEvent<T>) => {
        setTimeout(() => {
            listeners
                .filter(_obs => {
                    return _obs.evt == evt
                })
                .forEach(_obs => {
                    setTimeout(() => _obs.handler(data), 1)
                })
        }, 1)
    }

    const removeListener: ObserverEventModel['removeListener'] = code => {
        const index = listeners.findIndex(obs => obs.code == code)

        if (index < 0) {
            return
        }

        listeners.splice(index, 1)
    }

    const clearListeners: ObserverEventModel['clearListeners'] = main => {
        for (let i = listeners.length - 1; i >= 0; i--) {
            if (listeners[i].main) {
                if (main) {
                    listeners.splice(i, 1)
                }

                continue
            }
            if (!main) {
                listeners.splice(i, 1)
            }
        }
    }

    return {
        on,
        emit,
        removeListener,
        listeners,
        clearListeners,
    }
}
