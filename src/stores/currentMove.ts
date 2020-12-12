import type { TMoves } from "$src/types";
import { writable } from "svelte/store";

function createCurrentMove() {
  const { subscribe, set } = writable<TMoves | null>(null);

  return {
    subscribe,
    setMove: (m: TMoves) => set(m),
    reset: () => set(null),
  };
}

export const currentMove = createCurrentMove();
