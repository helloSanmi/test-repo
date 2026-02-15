import { GAME_CONFIG } from "./config.js";

export function createInitialState() {
  return {
    score: 0,
    lives: GAME_CONFIG.maxLives,
    timeLeft: GAME_CONFIG.totalTimeSeconds,
    isGameOver: false,
    player: {
      x: GAME_CONFIG.width / 2 - GAME_CONFIG.playerWidth / 2,
      y: GAME_CONFIG.height - GAME_CONFIG.playerHeight - 12,
      width: GAME_CONFIG.playerWidth,
      height: GAME_CONFIG.playerHeight,
      velocityX: 0,
    },
    stars: [],
    bombs: [],
    powerUps: [],
    effects: {
      shieldSecondsLeft: 0,
    },
    spawn: {
      starTimer: 0,
      bombTimer: 0,
      powerUpTimer: 0,
      secondTimer: 0,
    },
  };
}
