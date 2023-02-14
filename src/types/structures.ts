import {ElementStates} from "./element-states";

export interface IElement<T> {
  value: T,
  state: ElementStates;

  nextState: () => void;
}

export class Element<T> implements IElement<T> {
  constructor(value: T, state: ElementStates = ElementStates.Default) {
    this.value = value;
    this.state = state;
  }

  public value: T;
  public state: ElementStates

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


