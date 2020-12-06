export type TGState = "WON" | "RUNNING" | "OVER";
export type TMoves = "LEFT" | "RIGHT" | "UP" | "DOWN";

export interface IMatInput {
  mat: number[][];
  score: number;
}

export type MatFn = (mi: IMatInput) => IMatInput;
export type MatMoveFn = (mat: number[][], score: number) => ReturnType<MatFn>;
