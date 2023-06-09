import { IAnimatronic } from './@types/animatronic'
import { ICamera, TCamera } from './@types/camera'
import { IDesk, TLight, TPort } from './@types/desk'
import { IEvent, IEventData, IEventTypes } from './@types/event'
import { GameConfig, IRecharge, IRepositoryDataGame, TRepositoryGame } from './@types/game'
import { ObserverEvent, TObserver } from './@types/observer'
import { ISettingGame } from './@types/setting'
import { GameController } from './controller/controller-game.js'

function AppGame(options: GameConfig) {
    const controlGame = GameController(options)

    return controlGame
}

export {
    AppGame,
    IAnimatronic,
    ICamera,
    TCamera,
    IDesk,
    TLight,
    TPort,
    IEvent,
    IEventData,
    IEventTypes,
    IRecharge,
    IRepositoryDataGame,
    TRepositoryGame,
    ObserverEvent,
    TObserver,
    ISettingGame,
    GameConfig,
}
