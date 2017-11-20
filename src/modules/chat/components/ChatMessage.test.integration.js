import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
import { chatMessageType } from '../../chat';
import { format } from '../../../util';
/* global cy, beforeEach, describe, expect */

const { routeAlias } = cypressHelper;

describe('The chat message component', () => {
  beforeEach(() => {
    cypressHelper.stubApiCalls();
    cypressHelper.goToChatRoomPage();
    cy.get('ul.chat-message-list>li>div').as('listedMessages');
  });

  it('contains expected contents for "Action" messages', () => {
    cy.fixture('chatMessages.json').then(messages => {
      const index = messages.findIndex(
        msg => msg.chatMessageType === chatMessageType.ACTION
      );
      expect(index).to.be.above(-1);

      const message = messages[index];

      cy
        .get('@listedMessages')
        .eq(index)
        .as('message');

      cy.get('@message').should('have.class', 'chat-action-message');

      cy
        .get('@message')
        .find('div.timestamp')
        .should('contain', format.time(message.timeStamp));
      cy
        .get('@message')
        .find('span.chat-action-message-text')
        .should('contain', `${message.userName} ${message.text}`);
    });
  });

  it('contains expected contents for "Chat" messages', () => {
    cy.fixture('chatMessages.json').then(messages => {
      const index = messages.findIndex(
        msg => msg.chatMessageType === chatMessageType.CHAT
      );
      expect(index).to.be.above(-1);

      const message = messages[index];

      cy
        .get('@listedMessages')
        .eq(index)
        .as('message');

      cy.get('@message').should('have.class', 'chat-message');

      cy
        .get('@message')
        .find('div.timestamp')
        .should('contain', format.time(message.timeStamp));

      cy
        .get('@message')
        .find('strong')
        .should('contain', `${message.userName}:`);

      cy
        .get('@message')
        .find('div.chat-message-text>p')
        .should('contain', message.text);
    });
  });
});
