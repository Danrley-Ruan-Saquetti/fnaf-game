import { IEvent, IEventData, IEventTypes } from '../@types/event'
import { GameConfig } from '../@types/game'
import { RepositoryGame } from '../repository/repository-game.js'
import { ObserverEvent } from '../util/observer.js'
import { AnimatronicController } from './controller-animatronic.js'
import { DeskController } from './controller-desk.js'

export function GameController(gameConfig: GameConfig) {
  const repoGame = RepositoryGame()
  const observer = ObserverEvent()

  const newGame = () => {
    const animatronicController = AnimatronicController(repoGame)
    const deskController = DeskController(repoGame, { emit: observer.emit })

    const getData = () => { return { ...repoGame.data, listeners: observer.listeners.filter(lis => !lis.main).map(lis => ({ code: lis.code, evt: lis.evt, handler: lis.handler })) } }

    const setup = () => {
      repoGame.reset()

      observer.clearListeners(true)

      observer.on('game/start', (ev) => { }, true)
      observer.on('game/end-game', (ev) => { }, true)
      observer.on('desk/camera/close', (ev) => { }, true)
      observer.on('desk/camera/open', (ev) => { }, true)
      observer.on('desk/camera/toggle', (ev) => { }, true)
      observer.on('desk/lights/off', (ev) => { }, true)
      observer.on('desk/lights/on', (ev) => { }, true)
      observer.on('desk/lights/toggle', (ev) => { }, true)
      observer.on('desk/ports/close', (ev) => { }, true)
      observer.on('desk/ports/open', (ev) => { }, true)
      observer.on('desk/ports/toggle', (ev) => { }, true)
    }

    const startNight = (night?: number) => {
      setup()

      repoGame.start(gameConfig)
      repoGame.setNight(night || repoGame.data.night)

      observer.emit('game/start', { data: repoGame.data, message: 'Game Start', })
    }

    return {
      startNight,
      getData,
      toggleCamera: deskController.toggleCamera,
      toggleLight: deskController.toggleLight,
      togglePort: deskController.togglePort,
      on: <E extends IEventTypes>(evt: E, handler: <T extends IEventData<E>>(data: IEvent<T>) => void) => observer.on(evt, handler),
      removeListener: observer.removeListener,
      clearListeners: () => observer.clearListeners(),
    }
  }

  return {
    newGame,
  }
}
