import { TRepositoryGame } from '../@types/game'
import { ObserverEvent } from '../@types/observer'

export function RunningGame({ animatroic, desk, emit, repo }: { repo: TRepositoryGame; desk: any; animatroic: any; emit: ObserverEvent['emit'] }) {
    let inter: number

    const start = async (update: () => void) => {
        inter = setInterval(() => {
            update()
        }, Math.round(repo.getSettings().FPS))
    }

    const end = () => {
        clearInterval(inter)
    }

    return {
        start,
        end,
    }
}
