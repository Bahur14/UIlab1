describe('E2E Тестування додатку To-Do List', () => {

  const baseUrl = 'http://localhost:3000';

  it('1. Сценарій логіну: повинен дозволяти вводити дані та натискати кнопку', () => {

    cy.visit(`${baseUrl}/login`);

    cy.get('input[name="login"]').type('student@univer.com');
    cy.get('input[name="password"]').type('secret123');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Спроба входу!');
    });

    cy.get('button[type="submit"]').contains('Увійти').click();
  });

  it('2. Навігація: повинен переходити з Профілю на сторінку Про додаток', () => {
    cy.visit(`${baseUrl}/profile`);

    cy.contains('Мій Профіль').should('be.visible');

    cy.contains('Про додаток').click();

    cy.url().should('include', '/about');
    cy.contains('Це веб-додаток «Список справ»').should('be.visible');
  });

it('3. Список справ: повинен додавати, відмічати та видаляти завдання', () => {
    cy.visit(`${baseUrl}/`); 

    cy.get('input[name="title"]').type('Здати лабораторну роботу №2');
    cy.get('input[name="description"]').type('Доробити скріншоти Cypress');
    cy.contains('button', 'Додати').click();

    cy.get('table').contains('Здати лабораторну роботу №2').should('be.visible');

    cy.get('table input[type="checkbox"]').first().check();

    cy.get('table').contains('button', 'Видалити').click();
  });
});