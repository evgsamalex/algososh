import TCircleState = Cypress.TCircleState;

Cypress.Commands.add('checkCircle', (element, state: TCircleState) => {
  cy.wrap(element).invoke('attr', 'data-test-state').should('eq', state.state);
  cy.wrap(element).find('[data-cy="letter"]').should('have.text', state.letter);
  if (state.head) {
    cy.wrap(element).find('[data-cy="head"]').should('have.text', state.head);
  }
  if (state.tail) {
    cy.wrap(element).find('[data-cy="tail"]').should('have.text', state.tail);
  }
})

Cypress.Commands.add('checkInputAndButton', (inputSelector, buttonSelector) => {
  cy.get(inputSelector).should("have.value", '');
  cy.get(buttonSelector).should('have.attr', 'disabled');
})

Cypress.Commands.add('setInputAndSubmit', (inputSelector, submitSelector, text: string) => {
  cy.get(inputSelector).type(text);
  cy.get(submitSelector).should('not.have.attr', 'disabled');
  cy.get(submitSelector).click();
})

Cypress.Commands.add('clickButton', (buttonSelector: string) => {
  cy.get(buttonSelector).click();
})

Cypress.Commands.add('checkCount', (selector: string, count: number) => {
  cy.get(selector).should('have.length', count);
})
