import { GAME_CONFIG } from "./config.js";
import { createInitialState } from "./state.js";
import { spawnBomb, spawnPowerUp, spawnStar, updateEntities } from "./entities.js";
import { getPowerUpLabel, tickPowerUpEffects } from "./powerups.js";

export function createGame({ input, renderer, scoreEl, livesEl, timeEl, powerUpEl }) {
  let state = createInitialState();
  let running = false;
  let lastFrameTime = 0;
  let rafId = 0;

  function updateHUD() {
    scoreEl.textContent = String(state.score);
    livesEl.textContent = String(Math.max(0, state.lives));
    timeEl.textContent = String(Math.max(0, Math.ceil(state.timeLeft)));
    powerUpEl.textContent = getPowerUpLabel(state);
  }

  function tick(now) {
    if (!running) return;

    if (!lastFrameTime) {
      lastFrameTime = now;
    }

    const deltaSeconds = Math.min((now - lastFrameTime) / 1000, 0.05);
    lastFrameTime = now;

    if (!state.isGameOver) {
      const axis = input.getHorizontalAxis();
      state.player.velocityX = axis * GAME_CONFIG.playerSpeed;
      state.player.x += state.player.velocityX * deltaSeconds;
      state.player.x = Math.max(0, Math.min(GAME_CONFIG.width - state.player.width, state.player.x));

      state.spawn.starTimer += deltaSeconds * 1000;
      state.spawn.bombTimer += deltaSeconds * 1000;
      state.spawn.powerUpTimer += deltaSeconds * 1000;
      state.spawn.secondTimer += deltaSeconds;

      if (state.spawn.starTimer >= GAME_CONFIG.starSpawnInterval) {
        state.spawn.starTimer = 0;
        spawnStar(state);
      }

      if (state.spawn.bombTimer >= GAME_CONFIG.bombSpawnInterval) {
        state.spawn.bombTimer = 0;
        spawnBomb(state);
      }

      if (state.spawn.powerUpTimer >= GAME_CONFIG.powerUpSpawnInterval) {
        state.spawn.powerUpTimer = 0;
        spawnPowerUp(state);
      }

      if (state.spawn.secondTimer >= 1) {
        state.spawn.secondTimer -= 1;
        state.timeLeft -= 1;
      }

      updateEntities(state, deltaSeconds);
      tickPowerUpEffects(state, deltaSeconds);

      if (state.lives <= 0 || state.timeLeft <= 0) {
        state.isGameOver = true;
      }
    }

    updateHUD();
    renderer.render(state);
    rafId = requestAnimationFrame(tick);
  }

  return {
    start() {
      if (running) return;
      running = true;
      lastFrameTime = 0;
      updateHUD();
      renderer.render(state);
      rafId = requestAnimationFrame(tick);
    },
    restart() {
      state = createInitialState();
      updateHUD();
      renderer.render(state);
    },
    stop() {
      running = false;
      cancelAnimationFrame(rafId);
      input.cleanup();
    },
  };
}
