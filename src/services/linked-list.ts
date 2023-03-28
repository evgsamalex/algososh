import {ILinkedList, Node} from "../types/structures/linked-list";
import {Element, IElement} from "../types/structures/element";
import {headTail, headTailElement, Map} from "./utils";
import {ElementStates} from "../types/element-states";


export const toItems = <T, >(list: ILinkedList<IElement<T>>): IElement<T>[] => {

  const map = Map(list.all(), (node, index) => {
    let value = node.value;
    value.index = index;
    if (!value.head || (value.head && value.head.elementType !== "element")) {
      value.head = index === 0 ? headTail('head') : undefined;
    }

    if (!value.tail || (value.tail && value.tail.elementType !== "element")) {
      value.tail = !node.next ? headTail('tail') : undefined;
    }

    return value;

  })

  return [...map];
}


export function* addToHead<T>(list: ILinkedList<IElement<T>>, item: T): Generator<IElement<T>[]> {
  console.log('123');
  const head = list.head;
  const element = new Element(0, item);
  element.head = headTail('head');
  if (!head) {
    list.insertAt(element, 0);
    return toItems(list);
  }

  head.value.head = headTailElement(String(item), ElementStates.Changing);
  yield toItems(list);
  head.value.head = undefined;

  list.insertAt(element, 0);
  element.modified();
  yield toItems(list);
  element.default();
  console.log(list);
  return toItems(list);
}

export function* removeFromHead<T>(list: ILinkedList<IElement<T>>) {
  const head = list.head;
  if (!head) return;

  head.value.tail = headTailElement(String(head.value.value), ElementStates.Changing, true);
  yield toItems(list);

  list.removeHead();
  console.log(list);
  return toItems(list);
}

export function* addToTail<T>(list: ILinkedList<IElement<T>>, item: T) {
  const tail = list.getTail();
  const element = new Element(0, item);
  if (!tail) {
    list.append(element);
    return toItems(list);
  }

  tail.value.head = headTailElement(String(item), ElementStates.Changing);
  yield toItems(list);
  tail.value.head = undefined;

  list.append(element);
  element.modified();
  yield toItems(list);
  element.default();
  console.log(list);
  return toItems(list);
}

export function* removeFromTail<T>(list: ILinkedList<IElement<T>>) {
  const tail = list.getTail();
  if (!tail) return;

  tail.value.tail = headTailElement(String(tail.value.value), ElementStates.Changing, true);
  yield toItems(list);

  list.removeTail();
  return toItems(list);
}

export function* insertAtIndex<T>(list: ILinkedList<IElement<T>>, item: T, position: number) {
  if (position < 0 || position > list.size) {
    console.error('Enter a valid index');
    throw Error('Enter a valid index');
  }

  if (!list.head) {
    yield* addToHead(list, item);
    return toItems(list);
  }

  const element = new Element(0, item, ElementStates.Modified);

  let curr: Node<IElement<T>> | null = list.head;
  let currIndex = 0;
  if (position === 0) {
    curr.value.changing();
  }
  while (currIndex < position && curr !== null) {
    curr.value.changing();
    curr.value.head = headTailElement(String(item), ElementStates.Changing);
    yield toItems(list);
    curr.value.head = undefined;
    curr = curr.next;
    currIndex++;
  }

  if (curr) {
    curr.value.head = headTailElement(String(item), ElementStates.Changing);
    yield toItems(list);
    curr.value.head = undefined;
  }

  list.insertAt(element, position);

  yield toItems(list);

  for (let node of list.all()) {
    node.value.head = undefined;
    node.value.default();
  }

  return toItems(list);
}

export function* removeAtIndex<T>(list: ILinkedList<IElement<T>>, position: number) {
  if (position < 0 || position > list.size || !list.head) {
    console.error('Enter a valid index');
    throw Error('Enter a valid index');
  }

  let curr: Node<IElement<T>> | null = list.head;
  let currIndex = 0;
  if (position === 0) {
    curr.value.changing();
  }
  while (currIndex < position && curr !== null) {
    curr.value.changing();
    yield toItems(list);
    curr = curr.next;
    currIndex++;
  }

  if (curr) {
    curr.value.tail = headTailElement(String(curr.value.value), ElementStates.Changing, true);
    yield toItems(list);
    curr.value.tail = undefined;
  }

  list.removeAt(position);

  for (let node of list.all()) {
    node.value.head = undefined;
    node.value.default();
  }

  return toItems(list);
}

