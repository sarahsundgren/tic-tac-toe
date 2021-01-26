/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />

context("Draw Conditions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("draw on default board", () => {
    cy.get('input[type="button"]').then((buttons) => {
      const rowSize = Math.sqrt(buttons.length);

      for (let i = 0; i < buttons.length; i++) {
        if (i === 2) {
          cy.get(buttons[i + rowSize]).click();
          cy.get(buttons[i]).click();
        } else {
          cy.get(buttons[i]).click({ force: true });

          if (i + rowSize < buttons.length) {
            cy.get(buttons[i + rowSize]).click({ force: true });
          }
        }
      }

      cy.contains("Stalemate");
    });
  });
});
