import {submitSelector, circleSelector, inputSelector} from "./constants";

describe('string tests', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('Кнопка должна быть не активна если текст пустой', () => {
    cy.checkInputAndButton(inputSelector, submitSelector);
  });

  it('Проверка разворота строки', () => {
    cy.fixture('string').then(obj => {
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
