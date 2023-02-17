import {IStack} from "../types/structures/stack";
import {Element, IElement} from "../types/structures/element";
import {ElementStates} from "../types/element-states";
import {headTail} from "./utils";

const setTop = (stack: IStack<IElement<string>>, head?: string) => {
  const last = stack.peak();
  if (last) {
    last.head = head ? headTail(head) : undefined;
  }
}

export function* stackPush(stack: IStack<IElement<string>>, text: string): Generator<IStack<IElement<string>>> {
  const element = new Element(stack.length(), text, ElementStates.Changing);
  element.head = headTail('top');
  setTop(stack);
  stack.push(element);
  yield stack;
  element.default();
  return stack;
}


export function* stackRemove(stack: IStack<IElement<string>>): Generator<IStack<IElement<string>>> {
  const last = stack.peak();
  if (last) {
    last.changing();
  }
  yield stack;
  stack.pop();
  setTop(stack, 'top');
  return stack;
}
