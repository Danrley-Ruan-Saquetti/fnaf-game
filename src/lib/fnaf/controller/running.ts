import { TRepositoryGame } from '../@types/game'
import { ObserverEventModel } from '../@types/observer'
import { IEventTypes } from '../index'
import { ObserverEvent } from '../util/observer.js'

export function Running({
    obs: obsMain,
    repo,
}: {
    repo: TRepositoryGame
    obs: { on: ObserverEventModel['on']; removeListener: ObserverEventModel['removeListener'] }
}) {
    let inter: number

    const obs = ObserverEvent()

    const setup = (fps: number) => {
        let a = obsMain.on('game/start', () => start(fps), true)

        let b = obsMain.on(
            'game/end-game',
            () => {
                end()
                obsMain.removeListener(a)
                obsMain.removeListener(b)
            },
            true
        )
    }

    const start = async (fps: number) => {
        inter = setInterval(() => update(), Math.round(fps))
    }

    const end = () => {
        clearInterval(inter)
    }

    const update = () => {
        if (!repo.isRunning()) {
            return
        }

        obs.emit('game/update', { message: 'Game update', data: null })
    }

    return {
        setup,
        start,
        end,
        on: (evt: IEventTypes, handler: () => void) => obs.on(evt, handler),
    }
}
