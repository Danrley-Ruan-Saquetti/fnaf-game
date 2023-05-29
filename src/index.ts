import { GameController } from "./controller/controller-game.js";

function App() {
    const gameController = GameController();

    const game = gameController.newGame();

    game.start();

    console.log(game.getData());
}

window.onload = App;
