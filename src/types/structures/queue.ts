export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;

  all: () => Generator<T | null>;

  get head(): number;

  get tail(): number;

  isEmpty: () => boolean;

  isFull: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private readonly container: (T | null)[] = [];
  private _head = 0;
  private _tail = -1;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this._tail++;
    this.container[this._tail % this.size] = item;
    this.length += 1;
    if (this._tail >= this.size) {
      this._tail = 0;
    }
    //console.log([...this.container], `${this.head} -${this.tail}`);
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this._head % this.size] = null;
    this._head = this._head + 1;
    if (this._head >= this.size) {
      this._head = 0;
    }
    this.length -= 1;
    //console.log([...this.container], `${this.head} -${this.tail}`);
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this._head % this.size]
  };

  isEmpty = () => this.length === 0;

  isFull = () => this.length === this.size;

  * all(): Generator<T | null> {
    for (let item of this.container) {
      yield item;
    }
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._tail;
  }
}
