import type { MatMoveFn, TGState } from "$src/types";
import { compress, merge, reverse, transpose } from "$src/utils";
import { composeMatrix } from "$src/utils/compose";

export const GRID_SIZE = 4;

const left = composeMatrix(compress, merge, compress);
const right = composeMatrix(reverse, left, reverse);
const up = composeMatrix(transpose, left, transpose);
const down = composeMatrix(transpose, right, transpose);

export const moveLeft: MatMoveFn = (mat, score) => left({ mat, score });
export const moveRight: MatMoveFn = (mat, score) => right({ mat, score });
export const moveUp: MatMoveFn = (mat, score) => up({ mat, score });
export const moveDown: MatMoveFn = (mat, score) => down({ mat, score });

export function getState(mat: number[][]): TGState {
  // win condition
  for (let r of mat) {
    for (let cell of r) {
      if (cell === 2048) return "WON";
    }
  }

  // running conditions
  // - atleast one empty cell
  for (const r of mat) {
    for (const cell of r) {
      if (cell === 0) return "RUNNING";
    }
  }
  // - move possible (up, down, left, right)
  for (let i = 0; i < GRID_SIZE - 1; i++) {
    for (let j = 0; j < GRID_SIZE - 1; j++) {
      if (mat[i][j] === mat[i][j + 1] || mat[i][j] === mat[i + 1][j])
        return "RUNNING";
    }
  }

  for (let i = 0; i < GRID_SIZE - 1; i++) {
    if (mat[i][GRID_SIZE - 1] === mat[i + 1][GRID_SIZE - 1]) return "RUNNING";
  }

  for (let j = 0; j < GRID_SIZE - 1; j++) {
    if (mat[GRID_SIZE - 1][j] === mat[GRID_SIZE - 1][j + 1]) return "RUNNING";
  }

  return "OVER";
}
