import type { MatFn } from "$src/types";

const compose = (f1: any, f2: any) => (...args: unknown[]) => f1(f2(...args));

export const composeMatrix = (...fns: MatFn[]) => fns.reduce(compose);
