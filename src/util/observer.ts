import { IEvent } from './../@types/event.d';
import { IEventTypes } from '../@types/event'
import { TObserver } from './../@types/observer'
import { randomId } from './random-id'

export function ObserverEvent() {
    const observers: TObserver[] = []

    const on = (evt: IEventTypes, handler: <T>(data: IEvent<T>) => void) => {
        const code = randomId()

        observers.push({ evt, handler, code })

        return code
    }

    const emit = <T>(evt: IEventTypes, data: IEvent<T>) => {
        observers.filter(_obs => { return _obs.evt == evt }).forEach(_obs => {
            setTimeout(() => {
                _obs.handler(data)
            }, 1)
        })
    }

    const removeListener = (code: number) => {
        const index = observers.findIndex(obs => obs.code == code)

        if (index < 0) { return }

        observers.splice(index, 1)
    }

    return {
        on,
        emit,
        removeListener
    }
}