type TRoute = {
  selector: string,
  expectedText: string
}

const testData: TRoute[] = [
  {selector: "recursion", expectedText: "Строка"},
  {selector: "fibonacci", expectedText: "Последовательность Фибоначчи"},
  {selector: "sorting", expectedText: "Сортировка массива"},
  {selector: "stack", expectedText: "Стек"},
  {selector: "queue", expectedText: "Очередь"},
  {selector: "list", expectedText: "Связный список"},
]

describe('app works correctly with routes', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Главная страница', () => {
    cy.contains('МБОУ АЛГОСОШ');
  })

  testData.forEach(data => {
    it(`Маршрут: ${data.selector} содержит: ${data.expectedText}`, () => {
      cy.get(`a[href*="${data.selector}"]`).click();
      cy.get('[data-cy="page-header"]').should('have.text', data.expectedText);
      cy.get('[data-cy="return-link"]').click();
      cy.contains('МБОУ АЛГОСОШ');
    })
  })
})
