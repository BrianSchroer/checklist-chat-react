import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */

describe('The room list component', () => {
  beforeEach(() => {
    cypressHelper.stubApiCalls();
    cypressHelper.goToHomePage();
    cy.get('ul.room-list>li').as('listedRooms');
  });

  it('contains expected rooms', () => {
    cy.fixture('rooms.json').then(rooms => {
      for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];

        cy
          .get('@listedRooms')
          .should('have.lengthOf', rooms.length)
          .eq(i)
          .find('a')
          .should('have.attr', 'href', `/room/${room.id}`)
          .and('contain', `${room.roomName} - ${room.description}`);
      }
    });
  });
});
