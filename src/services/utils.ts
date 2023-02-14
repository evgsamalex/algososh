import {DELAY_IN_MS} from "../constants/delays";

export const delay = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms);
});

export const swap = <T>(arr: T[], from: number, to: number) => {
  const tmp = arr[from];
  arr[from] = arr[to];
  arr[to] = tmp;
}

export const withDelay = async <T, >(generator: Generator<T, boolean>, callBack: (item:T)=> void, delayMs: number = DELAY_IN_MS) => {
  while (true){
    const next = generator.next();
    callBack(next.value as T);
    if(next.done){
      break;
    }
    await delay(delayMs);
  }
  for (let item of generator){
  }
}
