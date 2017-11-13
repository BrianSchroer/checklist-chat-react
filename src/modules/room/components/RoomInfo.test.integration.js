import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */

describe('The room info component', () => {
  beforeEach(() => {
    cypressHelper.stubApiCalls();
    cypressHelper.goToChatRoomPage();
    cy.get('div.chat-room-room-info').as('div');
  });

  it('contains expected contents', () => {
    cy.fixture('rooms.json').then(rooms => {
      const room = rooms[0];

      cy
        .get('@div')
        .find('div.room-info-panel-title')
        .should('contain', room.roomName);

      cy
        .get('@div')
        .find('div.room-info-panel-buttons button.btn-primary')
        .then($button => expect($button.text()).to.eq('Edit'));

      cy
        .get('@div')
        .find('p#roomDescription')
        .should('contain', room.description);

      cy
        .get('@div')
        .find('p#roomPhoneInfo')
        .should('contain', room.phoneInfo);
    });
  });
});
