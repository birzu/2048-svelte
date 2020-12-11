import { writable } from "svelte/store";

const INITIAL_SCORE = 0;

function createCurrentScore() {
  const { subscribe, set, update } = writable(INITIAL_SCORE);

  return {
    subscribe,
    setCurrent: (n: number) => set(n),
    reset: () => set(0),
  };
}

export const currentScore = createCurrentScore();
