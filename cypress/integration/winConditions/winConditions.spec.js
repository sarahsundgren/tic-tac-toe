/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />

context('Win Conditions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it ('win on default board', () => {
    winAll();
  });

  it ('win on size 5 board', () => {
    cy.get('input[type="number"]').clear().type('5');
    
    winAll();
  });

  it ('win on size 10 board', () => {
    cy.get('input[type="number"]').clear().type('10');

    winAll();
  });
});

const winAll = () => {
  winLastRow();
  cy.contains('Winner is X');
  cy.contains('Play Again').click();

  winLastCol();
  cy.contains('Winner is X');
  cy.contains('Play Again').click();

  winLeftDiagonal();
  cy.contains('Winner is X');
  cy.contains('Play Again').click();

  winRightDiagonal();
  cy.contains('Winner is X');
  cy.contains('Play Again').click();
}

const winLastRow = () => {
  cy.get('input[type="button"]').then((buttons) => {
    const rowSize = Math.sqrt(buttons.length);

    for (let i = buttons.length - rowSize; i < buttons.length; i++) {
      cy.get(buttons[i]).click();
      cy.get(buttons[i-rowSize]).click({ force: true });
    }
  });
}

const winLastCol = () => {
  cy.get('input[type="button"]').then((buttons) => {
    const colSize = Math.sqrt(buttons.length);

    for (let i = colSize - 1; i < buttons.length; i+= colSize) {
      cy.get(buttons[i]).click();
      cy.get(buttons[i - 1]).click({ force: true });
    }
  });
}

const winLeftDiagonal = () => {
  cy.get('input[type="button"]').then((buttons) => {
    const rowSize = Math.sqrt(buttons.length);

    for (let i = 0; i < buttons.length; i += rowSize + 1) {
      cy.get(buttons[i]).click();

      if (i + 1 < buttons.length) {
        cy.get(buttons[i + 1]).click();
      }
    }
  });
}

const winRightDiagonal = () => {
  cy.get('input[type="button"]').then((buttons) => {
    const colSize = Math.sqrt(buttons.length);

    for (let i = colSize - 1; i <= buttons.length - colSize; i+= colSize - 1) {
      cy.get(buttons[i]).click();
      cy.get(buttons[i - 1]).click({ force: true });
    }
  });
}