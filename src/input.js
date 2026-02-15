export function createInputController() {
  const pressed = new Set();

  function onKeyDown(event) {
    pressed.add(event.key.toLowerCase());
  }

  function onKeyUp(event) {
    pressed.delete(event.key.toLowerCase());
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return {
    getHorizontalAxis() {
      const left = pressed.has("arrowleft") || pressed.has("a");
      const right = pressed.has("arrowright") || pressed.has("d");
      return Number(right) - Number(left);
    },
    cleanup() {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      pressed.clear();
    },
  };
}
