declare namespace Cypress {
  type TCircleState = {
    letter: string,
    state: "default" | "changing" | "modified",
    head?: string,
    tail?: string,
    tailElement?: TCircleState,
    headElement?: TCircleState
  }

  interface Chainable<Subject = any> {
    checkCircle<E extends Node = HTMLElement>(element: E | JQuery<E>, state: TCircleState, isSmall?: boolean): Chainable<JQuery<E>>

    checkInputAndButton(inputSelector: string, buttonSelector: string): Chainable

    setInputAndSubmit(inputSelector: string, submitSelector: string, text: string): Chainable

    clickButton(buttonSelector: string): Chainable;

    checkCount(selector: string, count: number);
  }
}
