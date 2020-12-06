import { GRID_SIZE } from "$src/game";
import type { IMatInput } from "$src/types";

export function transpose({ mat, score }: IMatInput) {
  if (mat.length !== mat[0].length) throw new Error("Invalid Matrix");

  const newMat: number[][] = Array.from({ length: mat.length }, () => []);

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat.length; j++) {
      newMat[i][j] = mat[j][i];
    }
  }

  return { mat: newMat, score };
}

export function merge({ mat, score }: IMatInput) {
  if (mat.length !== mat[0].length) throw new Error("Invalid Matrix");

  const newMat: number[][] = Array.from({ length: mat.length }, (_, i) => [
    ...mat[i],
  ]);
  let newScore = score;

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat.length - 1; j++) {
      if (newMat[i][j] === newMat[i][j + 1] && newMat[i][j] !== 0) {
        newMat[i][j] *= 2;
        newMat[i][j + 1] = 0;
        newScore += newMat[i][j];
      }
    }
  }

  return { mat: newMat, score: newScore };
}

export function compress({ mat, score }: IMatInput) {
  if (mat.length !== mat[0].length) throw new Error("Invalid Matrix");

  const newMat: number[][] = Array.from({ length: mat.length }, (_, i) => [
    ...mat[0].map((el) => 0),
  ]);

  for (let i = 0; i < mat.length; i++) {
    let pos = 0;
    for (let j = 0; j < mat.length; j++) {
      if (mat[i][j] !== 0) {
        newMat[i][pos] = mat[i][j];
        pos += 1;
      }
    }
  }

  return { mat: newMat, score };
}

export function reverse({ mat, score }: IMatInput) {
  if (mat.length !== mat[0].length) throw new Error("Invalid Matrix");

  const newMat: number[][] = Array.from({ length: mat.length }, (_, i) => [
    ...mat[0].map(() => 0),
  ]);

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat.length; j++) {
      newMat[i][j] = mat[i][mat.length - j - 1];
    }
  }

  return { mat: newMat, score };
}

export const pickRandomCellValue = function () {
  const n = Math.random();
  return n > 0.85 ? 4 : 2;
};

export const pickRandomCoords = function () {
  const i = Math.floor(Math.random() * GRID_SIZE);
  const j = Math.floor(Math.random() * GRID_SIZE);
  return [i, j];
};
