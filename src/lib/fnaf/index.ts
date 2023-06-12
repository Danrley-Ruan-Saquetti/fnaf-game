import { IAnimatronic } from './@types/animatronic'
import { ICamera, TCamera } from './@types/camera'
import { IDesk, TLight, TPort } from './@types/desk'
import { IEvent, IEventData, IEventTypes } from './@types/event'
import { GameConfig } from './@types/game'
import { GameController } from './controller/controller-game.js'

function AppGame(options: GameConfig) {
    const controlGame = GameController(options)

    return controlGame
}

export type { IAnimatronic, ICamera, TCamera, IDesk, TLight, TPort, IEvent, IEventData, IEventTypes, GameConfig }

export { AppGame }
