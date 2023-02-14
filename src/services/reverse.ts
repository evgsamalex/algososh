import {Element, IElement} from "../types/structures";
import {ElementStates} from "../types/element-states";
import {swap} from "./utils";

const nextState = (arr: IElement<string>[], i: number, j: number) => {
  arr[i].nextState();
  arr[j].nextState();
}

const textToElements = (text:string):IElement<string>[] => {
  let state = text.length > 1 ? ElementStates.Default : ElementStates.Modified;
  return text.split('')
    .map((s,index) => {
      return new Element(index,s, state);
    });
}

export default function* reverseElements(text: string): Generator<IElement<string>[]> {
  let arr = textToElements(text);

  yield arr;

  let i = 0;  let j = text.length - 1;
  nextState(arr, i, j);
  yield arr;

  while (true) {
    swap(arr, i, j);
    nextState(arr, i, j);
    i++;
    j--;
    nextState(arr, i, j);
    if (i >= j) {
      return arr;
    }
    yield arr;
  }
}
