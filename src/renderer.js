import { GAME_CONFIG } from "./config.js";
import { isShieldActive } from "./powerups.js";

export function createRenderer(canvas) {
  const ctx = canvas.getContext("2d");

  function clear() {
    ctx.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
  }

  function drawPlayer(player, shieldActive) {
    ctx.fillStyle = "#ffd44f";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    if (shieldActive) {
      ctx.strokeStyle = "#73ffb6";
      ctx.lineWidth = 3;
      ctx.strokeRect(player.x - 4, player.y - 4, player.width + 8, player.height + 8);
    }
  }

  function drawCircle(entity, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(entity.x, entity.y, entity.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawGameOver(state) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 34px Segoe UI";
    ctx.fillText("Game Over", GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 - 18);
    ctx.font = "20px Segoe UI";
    ctx.fillText(`Final Score: ${state.score}`, GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 + 20);
  }

  return {
    render(state) {
      clear();
      drawPlayer(state.player, isShieldActive(state));
      state.stars.forEach((star) => drawCircle(star, "#77ddff"));
      state.bombs.forEach((bomb) => drawCircle(bomb, "#ff6262"));
      state.powerUps.forEach((powerUp) => drawCircle(powerUp, "#73ffb6"));

      if (state.isGameOver) {
        drawGameOver(state);
      }
    },
  };
}
