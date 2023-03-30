import {circleSelector, inputSelector, submitSelector} from "./constants";
import TCircleState = Cypress.TCircleState;

describe('queue tests', () => {

  const addTailSelector = '[data-cy="add-tail"]'
  const removeHeadSelector = '[data-cy="remove-head"]'
  const removeTailSelector = '[data-cy="remove-tail"]'
  const inputIndexSelector = '[data-cy="input-index"]'
  const addIndexSelector = '[data-cy="add-index"]'
  const removeIndexSelector = '[data-cy="remove-index"]'

  const testScenario = (fileName: string, stepAction: (item: any) => void) => {
    cy.fixture(fileName).then(obj => {
      for (let i = 0; i < obj.steps.length; i++) {
        const item = obj.steps[i];
        stepAction(item);
        for (let state of item.states) {
          cy.get(circleSelector).each((element, index) => {
            if (state[index]) {
              cy.checkCircle(element, state[index], false);
            }
          })
          cy.wait(obj.delay);
        }
      }
    })
  }

  const addItems = (items: string[]) => {
    items.forEach(x => {
      cy.setInputAndSubmit(inputSelector, addTailSelector, x);
      cy.wait(1000);
    })
  }

  beforeEach(() => {
    cy.visit('./list')
  });

  it('Кнопки должны быть не активны если текст пустой', () => {
    cy.checkInputAndButton(inputSelector, submitSelector);
    cy.checkInputAndButton(inputSelector, addTailSelector);
    cy.checkInputAndButton(inputSelector, addIndexSelector);
  });

  it('Отображение дефолтного списка', () => {
    const items: TCircleState[] = [
      {letter: '1', state: "default", head: "head"},
      {letter: '2', state: "default",},
      {letter: '3', state: "default", head: "tail"},
    ];
    items.forEach(x => {
      cy.setInputAndSubmit(inputSelector, addTailSelector, x.letter);
      cy.wait(1000);
    })
    cy.get('[data-cy="circle-list"]').children().each((element, index) => {
      if (index < items.length - 1) {
        cy.wrap(element).children().should('have.length', 2);
        cy.checkCircle(element.children().first(), items[index], false);
      } else {
        cy.wrap(element).children().should('have.length', 1);
      }
    })
  })

  it('Добавление элемента в head', () => {
    testScenario('list/add-head.json', ({text}) => {
      cy.setInputAndSubmit(inputSelector, submitSelector, text)
    })
  })

  it('Добавление элемента в tail', () => {
    testScenario('list/add-tail.json', ({text}) => {
      cy.setInputAndSubmit(inputSelector, addTailSelector, text)
    })
  })

  it('Добавление по индексу', () => {
    addItems(["1", "2", "3"]);
    testScenario('list/add-index.json', ({text, index}) => {
      cy.get(inputSelector).type(text);
      cy.get(inputIndexSelector).type(index);
      cy.get(addIndexSelector).click();
    })
  })

  it('Удаление из head', () => {
    addItems(["1", "2"]);
    testScenario('list/remove-head.json', () => {
      cy.get(removeHeadSelector).click();
    })
  })

  it('Удаление из tail', () => {
    addItems(["1", "2"]);
    testScenario('list/remove-tail.json', () => {
      cy.get(removeTailSelector).click();
    })
  })

  it('Удаление по индексу', () => {
    addItems(["1", "2", "3", "4"]);
    testScenario('list/remove-index.json', ({index}) => {
      cy.get(inputIndexSelector).type(index);
      cy.get(removeIndexSelector).click();
    })
  })
})
