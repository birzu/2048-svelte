import { writable } from "svelte/store";

function createBestScore() {
  const bestScore = localStorage.getItem("best-score");
  const initial = bestScore && Number.isInteger(+bestScore) ? +bestScore : 0;
  console.log(initial);
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    setNewBest: (n: number) => update((prev: number) => (n < prev ? prev : n)),
  };
}

export const bestScore = createBestScore();
