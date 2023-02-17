export class Node<T> {
  value: T
  next: Node<T> | null

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;

  removeAt: (position: number) => void;

  removeHead: () => void;
  removeTail: () => void;

  get size(): number;

  get head(): Node<T> | null;

  all: () => Generator<Node<T>>;

  getTail: () => Node<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  private _head: Node<T> | null;
  private _size: number;

  constructor() {
    this._head = null;
    this._size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this._size) {
      console.error('Enter a valid index');
      throw Error('Enter a valid index');
    }
    const node = new Node(element);

    if (index === 0) {
      node.next = this._head;
      this._head = node;
    } else {
      let curr = this._head;
      let prev = null;
      let currIndex = 0;
      while (currIndex < index && curr !== null) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (prev) {
        prev.next = node;
        node.next = curr;
      }
    }

    this._size++;
  }

  removeAt(index: number) {
    if (index < 0 || index > this._size) {
      console.error('Enter a valid index');
      throw Error('Enter a valid index');
    }

    if (index === 0) {
      if (!this._head) return;
      this._head = this._head?.next;
    } else {
      let curr = this._head;
      let prev = null;
      let currIndex = 0;
      while (currIndex < index && curr !== null) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (prev && curr) {
        prev.next = curr?.next;
      }
    }

    this._size++;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this._head === null) {
      this._head = node;
    } else {
      current = this._head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this._size++;
  }

  get size() {
    return this._size;
  }

  get head() {
    return this._head;
  }

  * all(): Generator<Node<T>> {
    let curr = this._head;
    while (curr) {
      yield curr;
      curr = curr.next;
    }
  }

  removeHead() {
    if (!this._head) return;
    this._head = this._head.next;
    this._size--;
  }

  removeTail() {
    if (!this._head) return;

    if (this._size === 1) {
      this._head = null;
      this._size--;
      return;
    }

    let curr = this._head;
    let prev = this._head;
    while (curr?.next) {
      prev = curr;
      curr = curr.next;
    }
    console.log(prev);
    if (prev) {
      prev.next = null;
      this._size--;
    }
  }

  getTail() {
    let current = this._head;
    while (current && current.next) {
      current = current.next;
    }
    return current;
  }
}

