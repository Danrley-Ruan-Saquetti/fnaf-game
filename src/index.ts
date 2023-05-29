import { GameConfig } from "./@types/game.js";
import { GameController } from "./controller/controller-game.js";

const SETUP_GAME: GameConfig = {
    night: 1,
    animatronics: [
        {
            active: false,
            name: "Chica",
            currentPosition: 1,
            progress: [
                { position: 1 },
                { position: 2 },
                { position: 5 },
                { position: 8 },
                { position: 11 },
                { position: 12, attack: true },
            ],
            configNights: [],
        },
        {
            active: false,
            name: "Freddy",
            currentPosition: 1,
            progress: [
                { position: 1 },
                { position: 2 },
                { position: 5 },
                { position: 11 },
                { position: 12, attack: true },
            ],
            configNights: [],
        },
        {
            active: false,
            name: "Bonnie",
            currentPosition: 1,
            progress: [
                { position: 1 },
                { position: 2 },
                { position: 4 },
                { position: 9 },
                { position: 7 },
                { position: 10, attack: true },
            ],
            configNights: [],
        },
        {
            active: false,
            name: "Fox",
            currentPosition: 6,
            progress: [
                { position: 6 },
                { position: 7 },
                { position: 10, attack: true },
            ],
            configNights: [],
        },
    ],
    desk: {
        camera: {
            isOpen: false,
            recharge: 1000 * 1,
            inRecharge: false,
            cameraActive: 1,
            map: [
                { code: "CAM 1A", position: 1 },
                { code: "CAM 1B", position: 2 },
                { code: "CAM 1B", position: 3 },
                { code: "CAM 5", position: 4 },
                { code: "CAM 7", position: 5 },
                { code: "CAM 1C", position: 6 },
                { code: "CAM 3", position: 7 },
                { code: "CAM 6", position: 8 },
                { code: "CAM 2A", position: 9 },
                { code: "CAM 2B", position: 10 },
                { code: "CAM 4A", position: 11 },
                { code: "CAM 4B", position: 12 },
            ],
        },
        lights: [
            {
                code: "desk:left",
                isOn: false,
                blocked: false,
                inRecharge: false,
                recharge: 1000 * 1,
            },
            {
                code: "desk:right",
                isOn: false,
                blocked: false,
                inRecharge: false,
                recharge: 1000 * 1,
            },
        ],
        ports: [
            {
                code: "desk:left",
                isOpen: true,
                blocked: false,
                inRecharge: false,
                recharge: 1000 * 1,
            },
            {
                code: "desk:right",
                isOpen: true,
                blocked: false,
                inRecharge: false,
                recharge: 1000 * 1,
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
};

function App() {
    const gameController = GameController();

    const game = gameController.newGame(SETUP_GAME);

    const MAP_EVENT_ACTIONS: { [x in string]: () => void } = {
        " ": () => game.toggleCamera(),
        a: () => game.togglePort({ code: "desk:left" }),
        d: () => game.togglePort({ code: "desk:right" }),
        q: () => game.toggleLight({ code: "desk:left" }),
        e: () => game.toggleLight({ code: "desk:right" }),
    };

    game.start();

    game.on("game/start", (ev) => console.log(ev));
    game.on("game/end-game", (ev) => console.log(ev));
    game.on("desk/camera/close", (ev) => console.log(ev));
    game.on("desk/camera/open", (ev) => console.log(ev));
    game.on("desk/camera/toggle", (ev) => { });
    game.on("desk/lights/off", (ev) => console.log(ev));
    game.on("desk/lights/on", (ev) => console.log(ev));
    game.on("desk/lights/toggle", (ev) => { });
    game.on("desk/ports/close", (ev) => console.log(ev));
    game.on("desk/ports/open", (ev) => console.log(ev));
    game.on("desk/ports/toggle", (ev) => { });

    addEventListener("keydown", ({ key }) => {
        MAP_EVENT_ACTIONS[key] && MAP_EVENT_ACTIONS[key]();
    });
}

window.onload = App;
