import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */
const headerSelector = 'div.navbar-nav';

describe('The chat room page', () => {
  beforeEach(() => {
    cypressHelper.stubApiCalls();
    cypressHelper.goToChatRoomPage();
  });

  it('contains expected contents', () => {
    cy.title().should('eq', 'Checklist Chat');
    cy.get(headerSelector);

    cy.fixture('rooms.json').then(rooms => {
      cy.get('div.chat-room-room-info').should('contain', rooms[0].roomName);
    });

    cy.fixture('chatMessages.json').then(messages => {
      cy
        .get('ul.chat-message-list>li')
        .should('have.lengthOf', messages.length);
    });

    cy.fixture('checklistItems.json').then(items => {
      cy
        .get('table.checklist-table tr.checklist-item-row')
        .should('have.lengthOf', items.length);
    });

    cy
      .get('div.chat-room-chat-column div.chat-room-buttons button.btn-primary')
      .then($button => expect($button.text()).to.eq('Say something...'));

    cy
      .get('div.chat-room-chat-column div.chat-room-buttons button.btn-default')
      .then($button => expect($button.text()).to.eq("Who's here?"));

    cy
      .get(
        'div.chat-room-checklist-column div.chat-room-buttons button.btn-primary'
      )
      .then($button => expect($button.text()).to.eq('Add Checklist Item...'));
  });
});
