import {Direction} from "../types/direction";
import {Element, IElement} from "../types/structures/element";
import {swap} from "./utils";

const getRandomInt = (min: number = 3, max: number = 17): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const randomArr = (): IElement<number>[] => {
  //return [52, 64, 71, 66, 44, 47, 55, 30, 25, 54, 46, 59, 99].map((n, index) => new Element<number>(index, n))
  const count = getRandomInt();
  let arr: IElement<number>[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(new Element<number>(i, getRandomInt(0, 100)))
  }
  return arr;
}

const compare = (a: IElement<number>, b: IElement<number>, direction: Direction) => {
  return direction === Direction.Ascending
    ? a.value > b.value
    : a.value < b.value
}

export function* selectGenerator(arr: IElement<number>[], direction: Direction): Generator<IElement<number>[]> {
  const {length} = arr;

  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    arr[i].changing();
    for (let j = i + 1; j < length; j++) {
      arr[j].changing();
      yield arr;
      if (compare(arr[maxInd], arr[j], direction)) {
        maxInd = j;
      }
      arr[j].default();
    }
    swap(arr, i, maxInd);
    arr[i].modified();
  }
  arr.forEach(x => x.modified());
  yield arr;
}

export function* bubbleGenerator(arr: IElement<number>[], direction: Direction) {
  const {length} = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].changing();
      arr[j + 1].changing();
      yield arr;

      if (compare(arr[j], arr[j + 1], direction)) {
        swap(arr, j, j + 1);
      }

      arr[j].default();

    }

    arr[length - i - 1].modified();
  }
  return arr;
}
