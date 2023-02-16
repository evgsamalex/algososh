import {DELAY_IN_MS} from "../constants/delays";
import {THeadTail} from "../types/structures/element";
import {ElementStates} from "../types/element-states";

export const delay = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms);
});

export const swap = <T>(arr: T[], from: number, to: number) => {
  const tmp = arr[from];
  arr[from] = arr[to];
  arr[to] = tmp;
}

export const withDelay = async <T, >(generator: Generator<T, boolean>, callBack: (item: T) => void, delayMs: number = DELAY_IN_MS) => {
  while (true) {
    const next = generator.next();
    if (next.done && !next.value) {
      break;
    }
    callBack(next.value as T);
    if (!next.done) {
      await delay(delayMs);
    }
  }
}

export function* Map<TIn, TOut>(generator: Generator<TIn>, callback: (item: TIn, index: number) => TOut) {
  let i = 0;
  for (let item of generator) {
    yield callback(item, i);
    i++;
  }
}

export const headTail = (value: string): THeadTail => {
  return {value: value, elementType: "string", state: ElementStates.Default};
}

export const headTailElement = (value: string, state: ElementStates = ElementStates.Default, hideElement: boolean = false): THeadTail => {
  return {value: value, elementType: "element", state: state, hideElement};
}
