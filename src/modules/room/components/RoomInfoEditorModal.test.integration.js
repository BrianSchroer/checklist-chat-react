/* global cy, beforeEach, describe, expect */
function goToHomePage() {
  cy.server({ enable: false });
  cy.visit('/');
}

function populateNewRoomForm(buttonSelector) {
  const roomName = `New room ${new Date().toISOString()}`;
  const description = `${roomName} description`;

  cy.get(':button[value="Start a new chat..."]').click();

  cy.get('div.checklist-chat-modal-dialog');
  cy.get('h4.modal-title').should('contain', 'Add Chat Room');
  cy.get('input[name="roomName"]').type(roomName);
  cy.get('textarea[name="description"]').type(description);
  cy.get('input[name="phoneInfo"]').type(`${roomName} phone info`);
  cy.get(buttonSelector).click();

  return roomName;
}

describe('The room info editor', () => {
  it('does not save a new chat when the Cancel button is clicked', () => {
    goToHomePage();
    cy.get('ul.room-list>li').then($rooms => {
      const roomCount = $rooms.length;
      populateNewRoomForm(':button[value="Cancel"]');
      cy.get('ul.room-list>li').should('have.length', roomCount);
    });
  });

  it('does not save a new chat when the modal close button is clicked', () => {
    goToHomePage();
    cy.get('ul.room-list>li').then($rooms => {
      const roomCount = $rooms.length;
      populateNewRoomForm(':button.close');
      cy.get('ul.room-list>li').should('have.length', roomCount);
    });
  });

  it('saves a new chat when the Save button is clicked', () => {
    goToHomePage();
    cy.get('ul.room-list>li').then($rooms => {
      const roomCount = $rooms.length;
      const roomName = populateNewRoomForm(':submit[value="Save"]');
      cy.get('ul.room-list>li').should('have.length', roomCount + 1);
      cy.get(`ul.room-list>li>a:contains('${roomName}')`).then($a => {
        expect($a)
          .to.have.attr('href')
          .match(/\/room\/\d+/);
      });
    });
  });
});
