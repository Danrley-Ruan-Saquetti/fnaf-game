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

        const getData = () => {
            return {
                ...repoGame.getData(),
                listeners: observer.listeners.filter(lis => !lis.main).map(lis => ({ code: lis.code, evt: lis.evt, handler: lis.handler })),
            }
        }

        const setup = () => {
            repoGame.reset()

            observer.clearListeners(true)

            observer.on(
                'game/start',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        ((typeof gameConfig.settings.log == 'boolean' && gameConfig.settings.log) ||
                            Array.isArray(gameConfig.settings.log && gameConfig.settings.log.includes('game/start')))
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'game/end-game',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        ((typeof gameConfig.settings.log == 'boolean' && gameConfig.settings.log) ||
                            (Array.isArray(gameConfig.settings.log) && gameConfig.settings.log.includes('game/end-game')))
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/camera/close',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        Array.isArray(gameConfig.settings.log) &&
                        gameConfig.settings.log.includes('desk/camera/close')
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/camera/open',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        Array.isArray(gameConfig.settings.log) &&
                        gameConfig.settings.log.includes('desk/camera/open')
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/camera/toggle',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        ((typeof gameConfig.settings.log == 'boolean' && gameConfig.settings.log) ||
                            (Array.isArray(gameConfig.settings.log) && gameConfig.settings.log.includes('desk/camera/toggle')))
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/lights/off',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        Array.isArray(gameConfig.settings.log) &&
                        gameConfig.settings.log.includes('desk/lights/off')
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/lights/on',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        Array.isArray(gameConfig.settings.log) &&
                        gameConfig.settings.log.includes('desk/lights/on')
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/lights/toggle',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        ((typeof gameConfig.settings.log == 'boolean' && gameConfig.settings.log) ||
                            (Array.isArray(gameConfig.settings.log) && gameConfig.settings.log.includes('desk/lights/toggle')))
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/ports/close',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        Array.isArray(gameConfig.settings.log) &&
                        gameConfig.settings.log.includes('desk/ports/close')
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/ports/open',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        Array.isArray(gameConfig.settings.log) &&
                        gameConfig.settings.log.includes('desk/ports/open')
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
            observer.on(
                'desk/ports/toggle',
                ev => {
                    if (
                        typeof gameConfig.settings.log != 'undefined' &&
                        ((typeof gameConfig.settings.log == 'boolean' && gameConfig.settings.log) ||
                            (Array.isArray(gameConfig.settings.log) && gameConfig.settings.log.includes('desk/ports/toggle')))
                    ) {
                        console.log(ev)
                    }
                },
                true
            )
        }

        const startNight = (night?: number) => {
            setup()

            repoGame.start(gameConfig)
            repoGame.setNight(night || repoGame.getData().night)

            observer.emit('game/start', { data: repoGame.getData(), message: 'Game Start' })

            animatronicController.getPathByAnimatronic({ name: 'Bonnie' })
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
