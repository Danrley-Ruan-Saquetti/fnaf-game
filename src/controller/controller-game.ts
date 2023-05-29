import { RepositoryGame } from "../repository/repository-game.js";
import { ObserverEvent } from "../util/observer";
import { AnimatronicController } from "./controller-animatronic.js";
import { DeskController } from "./controller-desk.js";

export function GameController() {
  const newGame = () => {
    const repoGame = RepositoryGame();
    const observer = ObserverEvent()

    const animatronicController = AnimatronicController(repoGame);
    const deskController = DeskController(repoGame, { emit: observer.emit });

    const getData = () => repoGame.data;

    const setup = () => {
      repoGame.reset();
    };

    const start = () => {
      repoGame.start({
        night: 1,
        animatronics: [
          {
            active: true,
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
            active: true,
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
            active: true,
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
            active: true,
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
            { code: "desk:left", isOn: false, blocked: false },
            { code: "desk:right", isOn: false, blocked: false },
          ],
          ports: [
            { code: "desk:left", isOpen: true, blocked: false },
            { code: "desk:right", isOpen: true, blocked: false },
          ],
          battery: 100,
          hour: 0,
        },
      });
    };

    setup();

    return {
      start,
      getData,
      toggleCamera: deskController.toggleCamera,
      toggleLight: deskController.toggleLight,
      togglePort: deskController.togglePort,
      on: observer.on,
      removeListener: observer.removeListener
    };
  };

  return {
    newGame,
  };
}
