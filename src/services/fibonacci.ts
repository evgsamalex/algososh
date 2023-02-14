import {Element, IElement} from "../types/structures";
import {ElementStates} from "../types/element-states";

export default function* fibonacci(n: number): Generator<IElement<number>> {
  let a = 1, b = 0, temp;
  let i = 0;
  while (i <= n) {
    temp = a;
    a = a + b;
    b = temp;
    yield new Element(i, b, ElementStates.Default);
    i++;
  }
}
