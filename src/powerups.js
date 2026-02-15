import { GAME_CONFIG } from "./config.js";

export const POWER_UP_TYPES = {
  SHIELD: "shield",
};

export function applyPowerUp(state, type) {
  if (type === POWER_UP_TYPES.SHIELD) {
    state.effects.shieldSecondsLeft = GAME_CONFIG.shieldDurationSeconds;
  }
}

export function tickPowerUpEffects(state, deltaSeconds) {
  if (state.effects.shieldSecondsLeft > 0) {
    state.effects.shieldSecondsLeft = Math.max(0, state.effects.shieldSecondsLeft - deltaSeconds);
  }
}

export function isShieldActive(state) {
  return state.effects.shieldSecondsLeft > 0;
}

export function getPowerUpLabel(state) {
  if (isShieldActive(state)) {
    return `Shield (${Math.ceil(state.effects.shieldSecondsLeft)}s)`;
  }
  return "None";
}
