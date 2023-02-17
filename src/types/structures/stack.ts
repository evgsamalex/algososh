export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;

  all: () => Generator<T>;

  length: () => number;
}

export class Stack<T> implements IStack<T> {
  private readonly _items: T[] = [];
  private _length: number = 0;

  * all(): Generator<T> {
    for (let item of this._items) {
      yield item;
    }
  }

  peak(): T | null {
    return this._items[this._items.length - 1];
  }

  pop(): void {
    this._items.pop();
    this._length--;
  }

  push(item: T): void {
    this._items.push(item);
    this._length++;
  }

  length() {
    return this._length;
  }
}
