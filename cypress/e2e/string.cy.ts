const inputSelector = '[data-cy="input"]';
const buttonSelector = '[data-cy="submit"]';
const circleSelector = '[data-cy="circle"]';

describe('string tests', () => {
  let text = '';
  let states: TCircleState[][] = [];
  let delay: number;
  beforeEach(() => {
    cy.visit('/recursion');
    cy.fixture('string').then(obj => {
      text = obj.text;
      states = obj.states as TCircleState[][];
      delay = obj.delay;
    })
  });

  it('Кнопка должна быть не активна если текст пустой', () => {
    cy.get(inputSelector).should("have.value", '');
    cy.get(buttonSelector).should('have.attr', 'disabled');
  });

  it('Проверка разворота строки', () => {
    cy.get(inputSelector).type(text);
    cy.get(buttonSelector).should('not.have.attr', 'disabled');
    cy.get(buttonSelector).click();

    for (let state of states) {
      cy.get(circleSelector).each((element, index) => {
        cy.checkCircle(element, state[index]);
      })
      cy.wait(delay);
    }
  })
})
