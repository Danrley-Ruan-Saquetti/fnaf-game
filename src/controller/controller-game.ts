import { IEvent, IEventData, IEventTypes } from "../@types/event";
import { GameConfig } from "../@types/game";
import { RepositoryGame } from "../repository/repository-game.js";
import { ObserverEvent } from "../util/observer.js";
import { AnimatronicController } from "./controller-animatronic.js";
import { DeskController } from "./controller-desk.js";

export function GameController() {
  const newGame = (gameConfig: GameConfig) => {
    const repoGame = RepositoryGame();
    const observer = ObserverEvent();

    const animatronicController = AnimatronicController(repoGame);
    const deskController = DeskController(repoGame, { emit: observer.emit });

    const getData = () => ({ ...repoGame.data, listeners: observer.listeners });

    const setup = () => {
      repoGame.reset();

      observer.clearListeners();

      observer.on("game/start", (ev) => { }, true);
      observer.on("game/end-game", (ev) => { }, true);
      observer.on("desk/camera/close", (ev) => { }, true);
      observer.on("desk/camera/open", (ev) => { }, true);
      observer.on("desk/camera/toggle", (ev) => { }, true);
      observer.on("desk/lights/off", (ev) => { }, true);
      observer.on("desk/lights/on", (ev) => { }, true);
      observer.on("desk/lights/toggle", (ev) => { }, true);
      observer.on("desk/ports/close", (ev) => { }, true);
      observer.on("desk/ports/open", (ev) => { }, true);
      observer.on("desk/ports/toggle", (ev) => { }, true);
    };

    const start = () => {
      setup();

      repoGame.start(gameConfig);

      observer.emit("game/start", {
        data: repoGame.data,
        message: "Game Start",
      });
    };

    return {
      start,
      getData,
      toggleCamera: deskController.toggleCamera,
      toggleLight: deskController.toggleLight,
      togglePort: deskController.togglePort,
      on: <E extends IEventTypes>(
        evt: E,
        handler: <T extends IEventData<E>>(data: IEvent<T>) => void
      ) => observer.on(evt, handler),
      removeListener: observer.removeListener,
      clearListeners: () => observer.clearListeners(),
    };
  };

  return {
    newGame,
  };
}
