import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */

describe('A checklist', () => {
  beforeEach(() => {
    cypressHelper.stubApiCalls();
    cypressHelper.goToChatRoomPage();
  });

  it('contains expected contents', () => {
    cy.get('table.checklist-table>thead>tr>th').as('headerCells');
    cy
      .get('@headerCells')
      .eq(0)
      .should('have.text', '');
    cy
      .get('@headerCells')
      .eq(1)
      .should('have.text', '');
    cy
      .get('@headerCells')
      .eq(2)
      .should('have.text', 'Start');
    cy
      .get('@headerCells')
      .eq(3)
      .should('have.text', 'End');
    cy
      .get('@headerCells')
      .eq(4)
      .should('have.text', 'Description');
    cy
      .get('@headerCells')
      .eq(5)
      .should('have.text', 'Performed by');

    cy.fixture('checklistItems.json').then(items => {
      cy
        .get('table.checklist-table>tbody')
        .should('have.lengthOf', items.length);
    });
  });
});
