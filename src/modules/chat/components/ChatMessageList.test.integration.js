import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */

describe('The chat message list', () => {
  beforeEach(() => {
    cypressHelper.stubApiCalls();
    cypressHelper.goToChatRoomPage();
    cy.get('ul.chat-message-list>li').as('listedMessages');
  });

  it('contains all chat messages for the room', () => {
    cy.fixture('chatMessages.json').then(messages => {
      cy.get('@listedMessages').should('have.lengthOf', messages.length);
    });
  });
});
