import {IQueue} from "../types/structures/queue";
import {Element, IElement} from "../types/structures/element";

export const toItems = <T, >(queue: IQueue<IElement<T>>, empty: T): IElement<T>[] => {
  const items = [...queue.all()];

  return items.map((item, index) => {
    if (!item) {
      item = new Element(index, empty);
    }
    item.index = index;
    item.head = item.index === queue.head ? 'head' : undefined;
    item.tail = item.index === queue.tail ? 'tail' : undefined;
    return item;
  });
}

export function* enqueueGenerator<T>(queue: IQueue<IElement<T>>, items: IElement<T>[], item: T, empty: T): Generator<IElement<T>[]> {
  const next = items.find(x => x.index === queue.tail + 1);
  next?.changing();
  yield [...items];
  queue.enqueue(new Element(0, item))
  return toItems(queue, empty);
}

export function* dequeueGenerator<T>(queue: IQueue<IElement<T>>, items:IElement<T>[], empty: T): Generator<IElement<T>[]> {
  const current = items.find(x=>x.index === queue.head);
  current?.changing();
  yield [...items];
  queue.dequeue();
  return toItems(queue,empty);
}
