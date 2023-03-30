import {submitSelector, inputSelector, circleSelector} from "./constants";

describe('fibonacci tests', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('Кнопка должна быть не активна если текст пустой', () => {
    cy.get(inputSelector).should("have.value", '0');
    cy.get(submitSelector).should('have.attr', 'disabled');
  });

  it('Числа должны генерироваться корректно', () => {
    cy.fixture('fibonacci').then(obj => {

      cy.setInputAndSubmit(inputSelector, submitSelector, obj.text);

      for (let state of obj.states) {
        cy.get(circleSelector).each((element, index) => {
          cy.checkCircle(element, state[index]);
        })
        cy.wait(obj.delay);
      }
    })
  })
})
