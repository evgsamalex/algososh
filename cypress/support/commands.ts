import TCircleState = Cypress.TCircleState;

Cypress.Commands.add('checkCircle', (element, state: TCircleState) => {
  cy.wrap(element).invoke('attr', 'data-test-state').should('eq', state.state);
  cy.wrap(element).find('[data-cy="letter"]').should('have.text', state.letter);
})
