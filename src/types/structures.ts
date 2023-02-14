import {ElementStates} from "./element-states";

export interface IElement<T> {
  value: T,
  state: ElementStates;
  index: number;
  nextState: () => void;
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
}


