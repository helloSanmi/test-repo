import { createInputController } from "./input.js";
import { createRenderer } from "./renderer.js";
import { createGame } from "./game.js";

const canvas = document.getElementById("game-canvas");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timeEl = document.getElementById("time");
const powerUpEl = document.getElementById("power-up");
const restartBtn = document.getElementById("restart-btn");

if (!(canvas instanceof HTMLCanvasElement) || !scoreEl || !livesEl || !timeEl || !powerUpEl || !restartBtn) {
  throw new Error("Missing required DOM elements for Star Dash");
}

const input = createInputController();
const renderer = createRenderer(canvas);
const game = createGame({ input, renderer, scoreEl, livesEl, timeEl, powerUpEl });

game.start();

restartBtn.addEventListener("click", () => {
  game.restart();
});

window.addEventListener("beforeunload", () => {
  game.stop();
});
