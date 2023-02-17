import {ElementStates} from "../element-states";

export type THeadTail = {
  value: string;
  elementType: 'element' | 'string'
  state: ElementStates;
  hideElement?: boolean;
}

export interface IElement<T> {
  value: T,
  state: ElementStates;
  index: number;
  nextState: () => void;
  changing: () => void;
  modified: () => void;
  default: () => void;
  head?: THeadTail;
  tail?: THeadTail;
}

export class Element<T> implements IElement<T> {
  constructor(index: number, value: T, state: ElementStates = ElementStates.Default) {
    this.index = index;
    this.value = value;
    this.state = state;
  }

  public value: T;
  public state: ElementStates

  public index: number;

  public head?: THeadTail;
  public tail?: THeadTail;

  public nextState() {
    switch (this.state) {
      case ElementStates.Default:
        this.state = ElementStates.Changing;
        break;
      case ElementStates.Changing:
        this.state = ElementStates.Modified;
        break;
    }
  }

  public changing() {
    this.state = ElementStates.Changing
  };

  public modified() {
    this.state = ElementStates.Modified
  };

  public default() {
    this.state = ElementStates.Default
  };
}


