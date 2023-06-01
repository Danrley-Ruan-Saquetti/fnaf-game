import { GameConfig } from './@types/game.js'
import { GameController } from './controller/controller-game.js'

const SETUP_GAME: GameConfig = {
    night: 1,
    animatronics: [
        {
            active: false,
            name: 'Chica',
            currentPosition: { position: 0, path: 0 },
            mapPath: [
                { stage: 0, position: 0, paths: [] },
                { stage: 0, position: 1, paths: [] },
                { stage: 0, position: 3, paths: [] },
                { stage: 0, position: 6, paths: [] },
                { stage: 0, position: 9, paths: [] },
                { stage: 0, position: 10, paths: [] },
            ],
            config: {
                retreatPositionsTime: 3,
                nights: [
                    {
                        night: 1,
                        activationTime: 0,
                        rates: {
                            retreat: 45,
                            advance: 25,
                            attack: 10,
                        },
                    },
                ],
            },
        },
        {
            active: false,
            name: 'Freddy',
            currentPosition: { position: 0, path: 0 },
            mapPath: [
                { stage: 0, position: 0, paths: [] },
                { stage: 0, position: 1, paths: [] },
                { stage: 0, position: 2, paths: [] },
                { stage: 0, position: 9, paths: [] },
                { stage: 0, position: 10, paths: [] },
            ],
            config: {
                retreatPositionsTime: 3,
                nights: [
                    {
                        night: 1,
                        activationTime: 0,
                        rates: {
                            retreat: 45,
                            advance: 25,
                            attack: 10,
                        },
                    },
                ],
            },
        },
        {
            active: false,
            name: 'Bonnie',
            currentPosition: { position: 8, path: 0 },
            mapPath: [
                {
                    stage: 0,
                    position: 0,
                    paths: [{ path: 0, order: 0 }],
                },
                {
                    stage: 5,
                    position: 1,
                    paths: [
                        { path: 0, order: 1 },
                        { path: 1, order: 0 },
                    ],
                },
                {
                    stage: 5,
                    position: 2,
                    paths: [{ path: 1, order: 1 }],
                },
                {
                    stage: 8,
                    position: 7,
                    paths: [
                        { path: 0, order: 2 },
                        { path: 2, order: 0 },
                    ],
                },
                {
                    stage: 8,
                    position: 5,
                    paths: [{ path: 2, order: 1 }],
                },
                {
                    attack: true,
                    stage: 10,
                    position: 8,
                    paths: [{ path: 0, order: 3 }],
                },
            ],
            config: {
                retreatPositionsTime: 3,
                nights: [
                    {
                        night: 1,
                        activationTime: 0,
                        rates: {
                            retreat: 45,
                            advance: 25,
                            attack: 10,
                        },
                    },
                ],
            },
        },
        {
            active: false,
            name: 'Fox',
            currentPosition: { position: 5, path: 0 },
            mapPath: [
                { stage: 0, position: 5, paths: [] },
                { stage: 0, position: 6, paths: [] },
                { stage: 0, position: 9, paths: [] },
            ],
            config: {
                retreatPositionsTime: 3,
                nights: [
                    {
                        night: 1,
                        activationTime: 0,
                        rates: {
                            retreat: 45,
                            advance: 25,
                            attack: 10,
                        },
                    },
                ],
            },
        },
    ],
    desk: {
        camera: {
            isOpen: false,
            recharge: 1000 * 1,
            inRecharge: false,
            cameraActive: 1,
            map: [
                { code: 'CAM 1A', position: 0 },
                { code: 'CAM 1B', position: 1 },
                { code: 'CAM 5', position: 2 },
                { code: 'CAM 7', position: 3 },
                { code: 'CAM 1C', position: 4 },
                { code: 'CAM 3', position: 5 },
                { code: 'CAM 6', position: 6 },
                { code: 'CAM 2A', position: 7 },
                { code: 'CAM 2B', position: 8 },
                { code: 'CAM 4A', position: 9 },
                { code: 'CAM 4B', position: 10 },
            ],
        },
        lights: [
            {
                code: 'desk:light:left',
                isOn: false,
                recharge: 1000 * 1,
                position: 10,
                config: {},
            },
            {
                code: 'desk:light:right',
                isOn: false,
                recharge: 1000 * 1,
                position: 8,
                config: {},
            },
        ],
        ports: [
            {
                code: 'desk:port:left',
                isOpen: true,
                recharge: 1000 * 1,
                position: 10,
            },
            {
                code: 'desk:port:right',
                isOpen: true,
                recharge: 1000 * 1,
                position: 8,
            },
        ],
        battery: 100,
        hour: 0,
    },
    settings: {
        FPS: 1000 / 60,
        desk: {
            ports: { toggleDependent: true },
            lights: { toggleDependent: true },
        },
    },
}

function App() {
    const gameController = GameController(SETUP_GAME)

    const game = gameController.newGame()

    const MAP_EVENT_ACTIONS: { [x in string]: () => void } = {
        s: () => game.toggleCamera(),
        a: () => game.togglePort({ code: 'desk:port:left' }),
        d: () => game.togglePort({ code: 'desk:port:right' }),
        q: () => game.toggleLight({ code: 'desk:light:left' }),
        e: () => game.toggleLight({ code: 'desk:light:right' }),
        m: () => console.log(game.getData()),
    }

    game.startNight()

    game.on('game/start', ev => console.log(ev))
    game.on('game/end-game', ev => console.log(ev))
    game.on('desk/camera/close', ev => console.log(ev))
    game.on('desk/camera/open', ev => console.log(ev))
    game.on('desk/camera/toggle', ev => {})
    game.on('desk/lights/off', ev => console.log(ev))
    game.on('desk/lights/on', ev => console.log(ev))
    game.on('desk/lights/toggle', ev => {})
    game.on('desk/ports/close', ev => console.log(ev))
    game.on('desk/ports/open', ev => console.log(ev))
    game.on('desk/ports/toggle', ev => {})

    addEventListener('keydown', ({ key }) => {
        /* eslint  no-unused-expressions: ["off"] */
        MAP_EVENT_ACTIONS[key] && MAP_EVENT_ACTIONS[key]()
    })
}

window.onload = App
