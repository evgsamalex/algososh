import {circleSelector, inputSelector, submitSelector} from "./constants";

describe('stack tests', () => {
  const removeSelector = '[data-cy="remove"]'
  const clearSelector = '[data-cy="clear"]'

  beforeEach(() => {
    cy.visit('./stack')
  });

  it('Кнопка должна быть не активна если текст пустой', () => {
    cy.checkInputAndButton(inputSelector, submitSelector);
    cy.checkInputAndButton(inputSelector, removeSelector);
    cy.checkInputAndButton(inputSelector, clearSelector);
  });

  it('Добавление в стек', () => {
    cy.fixture('stack/add.json').then(obj => {
      for (let i = 0; i < obj.steps.length; i++) {
        const item = obj.steps[i];
        cy.setInputAndSubmit(inputSelector, submitSelector, item.text)
        for (let state of item.states) {
          cy.get(circleSelector).each((element, index) => {
            cy.checkCircle(element, state[index]);
          })
          cy.wait(obj.delay);
        }
      }
    })
  })

  it('Удаление из стека', () => {
    cy.fixture('stack/remove.json').then(obj => {
      const initItems = obj.items;
      const delay = obj.delay;
      for (let letter of initItems) {
        cy.setInputAndSubmit(inputSelector, submitSelector, letter);
        cy.wait(delay);
      }
      for (let i = 0; i < obj.steps.length; i++) {
        const item = obj.steps[i];
        cy.clickButton(removeSelector);
        for (let state of item.states) {
          cy.get(circleSelector).each((element, index) => {
            cy.checkCircle(element, state[index]);
          })
          cy.wait(obj.delay);
        }
      }
    })
  })

  it('Длина стека после нажатия кнопки Очистить должна быть 0', () => {
    for (let letter of ["1", "2", "3"]) {
      cy.setInputAndSubmit(inputSelector, submitSelector, letter);
      cy.wait(500);
    }
    cy.checkCount(circleSelector, 3);
    cy.clickButton(clearSelector);
    cy.checkCount(circleSelector, 0);
  })
})
