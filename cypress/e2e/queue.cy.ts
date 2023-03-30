import {circleSelector, clearSelector, inputSelector, removeSelector, submitSelector} from "./constants";
import TCircleState = Cypress.TCircleState;

describe('queue tests', () => {

  beforeEach(() => {
    cy.visit('./queue')
  });

  it('Кнопка должна быть не активна если текст пустой', () => {
    cy.checkInputAndButton(inputSelector, submitSelector);
    cy.checkInputAndButton(inputSelector, removeSelector);
    cy.checkCount(circleSelector, 7);
  });

  it('Добавление в очередь', () => {
    cy.fixture('queue/add.json').then(obj => {
      for (let i = 0; i < obj.steps.length; i++) {
        const item = obj.steps[i];
        cy.setInputAndSubmit(inputSelector, submitSelector, item.text)
        for (let state of item.states) {
          cy.get(circleSelector).each((element, index) => {
            if (state[index]) {
              cy.checkCircle(element, state[index]);
            }
          })
          cy.wait(obj.delay);
        }
      }
    })
  })

  it('Удаление из очереди', () => {
    cy.fixture('queue/remove.json').then(obj => {
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
            if (state[index]) {
              cy.checkCircle(element, state[index]);
            }
          })
          cy.wait(obj.delay);
        }
      }
    })
  })

  it('Длина очереди после нажатия кнопки Очистить должна быть 0', () => {
    for (let letter of ["1", "2", "3"]) {
      cy.setInputAndSubmit(inputSelector, submitSelector, letter);
      cy.wait(500);
    }
    cy.clickButton(clearSelector);
    cy.get(circleSelector).each((element, index) => {
      const state: TCircleState = {letter: "", state: "default"}
      if (index === 0) {
        state.head = "head"
      }
      cy.checkCircle(element, state);
    })
  })
})
