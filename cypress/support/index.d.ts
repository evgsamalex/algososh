declare namespace Cypress {
  type TCircleState = {
    letter: string,
    state: "default" | "changing" | "modified"
  }

  interface Chainable<Subject = any> {
    checkCircle<E extends Node = HTMLElement>(element: E | JQuery<E>, state: TCircleState): Chainable<JQuery<E>>
  }
}
