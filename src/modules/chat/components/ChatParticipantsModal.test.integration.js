import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */

const modalDivSelector = 'div.checklist-chat-modal-dialog';
const closeButtonSelector = ':button[value="Close"]';
const modalCloseButtonSelector = ':button.close';

describe('The chat participants modal display', () => {
  beforeEach(() => {
    cypressHelper.stubApiCalls();
    cypressHelper.goToChatRoomPage();

    cy
      .get('div.chat-room-buttons button.btn-default')
      .should('contain', "Who's here?")
      .click();

    cy.get(modalDivSelector);
  });

  it('should contain expected contents', () => {
    cy
      .get(`${modalDivSelector} h4.modal-title`)
      .should('contain', "Who's Here?");

    cy.get('div.chat-participants>table>thead>tr>th').as('headerCells');
    cy
      .get('@headerCells')
      .eq(0)
      .should('contain', 'Name');
    cy
      .get('@headerCells')
      .eq(1)
      .should('contain', 'Department');
    cy
      .get('@headerCells')
      .eq(2)
      .should('contain', 'Title');
    cy
      .get('@headerCells')
      .eq(3)
      .should('contain', 'Connection');

    cy.fixture('chatMessages.json').then(messages => {
      const sortedNames = messages.map(m => m.userName).sort();
      const uniqueNames = [...new Set(sortedNames)];
      cy
        .get('div.chat-participants>table>tbody>tr')
        .should('have.lengthOf', uniqueNames.length)
        .eq(0)
        .find('td')
        .eq(0)
        .should('contain', uniqueNames[0]);
    });
  });

  [
    {
      description: 'Cancel',
      selector: closeButtonSelector
    },
    {
      description: 'modal close',
      selector: modalCloseButtonSelector
    }
  ].forEach(button => {
    it(`is closed when the ${button.description} button is clicked`, () => {
      closeModal(button.selector);
    });
  });
});

function closeModal(closeButtonSelector = modalCloseButtonSelector) {
  cy.get(closeButtonSelector).click();
  cy.get(modalDivSelector).should('not.exist');
}
