/* global cy, beforeEach, describe, expect */
const modalDivSelector = 'div.checklist-chat-modal-dialog';
const newChatButtonSelector = ':button[value="Start a new chat..."]';
const editChatButtonSelector = 'div.room-info-panel-buttons>button.btn-primary';
const saveButtonSelector = ':submit[value="Save"]';
const cancelButtonSelector = ':button[value="Cancel"]';
const modalCloseButtonSelector = ':button.close';

function goToHomePage() {
  cy.server({ enable: false });
  cy.visit('/');
}

function goToExistingRoomPage() {
  cy.server({ enable: false });
  cy.visit('/');
  cy.get('ul.room-list>li>a:first').click({ force: true });
}

function closeModal(closeButtonSelector) {
  cy.get(closeButtonSelector).click();
  cy.get(modalDivSelector).should('not.exist');
}

function updateRoomInfo(openButtonSelector, closeButtonSelector) {
  const roomName = `Room ${new Date().toISOString()}`;
  const description = `${roomName} description`;
  const phoneInfo = `${roomName} phone info`;

  cy.get(openButtonSelector).click();

  cy.get('div.checklist-chat-modal-dialog');
  cy
    .get('h4.modal-title')
    .should(
      'contain',
      openButtonSelector === newChatButtonSelector
        ? 'Add Chat Room'
        : 'Edit Chat Room Info'
    );
  cy
    .get('input[name="roomName"]')
    .clear()
    .type(roomName);
  cy
    .get('textarea[name="description"]')
    .clear()
    .type(description);
  cy
    .get('input[name="phoneInfo"]')
    .clear()
    .type(phoneInfo);

  closeModal(closeButtonSelector);

  return { roomName, description, phoneInfo };
}

describe('The room info editor', () => {
  it('does not save a new chat when the Cancel button is clicked', () => {
    goToHomePage();
    cy.get('ul.room-list>li').then($rooms => {
      const roomCount = $rooms.length;
      updateRoomInfo(newChatButtonSelector, cancelButtonSelector);
      cy.get('ul.room-list>li').should('have.length', roomCount);
    });
  });

  it('does not save a new chat when the modal close button is clicked', () => {
    goToHomePage();
    cy.get('ul.room-list>li').then($rooms => {
      const roomCount = $rooms.length;
      updateRoomInfo(newChatButtonSelector, modalCloseButtonSelector);
      cy.get('ul.room-list>li').should('have.length', roomCount);
    });
  });

  it('saves a new chat when the Save button is clicked', () => {
    goToHomePage();
    cy.get('ul.room-list>li').then($rooms => {
      const roomCount = $rooms.length;
      const roomInfo = updateRoomInfo(
        newChatButtonSelector,
        saveButtonSelector
      );
      cy.get('ul.room-list>li').should('have.length', roomCount + 1);
      cy.get(`ul.room-list>li>a:contains('${roomInfo.roomName}')`).then($a => {
        expect($a)
          .to.have.attr('href')
          .match(/\/room\/\d+/);
      });
    });
  });

  it('requires a room name', () => {
    goToHomePage();
    cy.get(newChatButtonSelector).click();
    cy.get(':submit[value="Save"]').click();
    cy.get('div.alert').should('contain', 'Room name is required.');
    closeModal(cancelButtonSelector);
  });

  it('displays expected room info for an existing chat room', () => {
    goToExistingRoomPage();
    cy.get(editChatButtonSelector).click();
    cy.get('div.checklist-chat-modal-dialog');
    cy.get('h4.modal-title').should('contain', 'Edit Chat Room Info');

    cy.get('h3.panel-title').then($elem => {
      cy.get('input[name="roomName"]').should('have.value', $elem.text());
    });

    cy.get('p#roomDescription').then($elem => {
      cy.get('textarea[name="description"]').should('have.value', $elem.text());
    });

    cy.get('span.phone-info').then($elem => {
      cy.get('input[name="phoneInfo"]').should('have.value', $elem.text());
    });

    closeModal(cancelButtonSelector);
  });

  it('saves chat room updates when the Save button is clicked', () => {
    goToExistingRoomPage();
    const room = updateRoomInfo(editChatButtonSelector, saveButtonSelector);

    cy.get('h3.panel-title').should('contain', room.roomName);
    cy.get('p#roomDescription').should('contain', room.description);
    cy.get('span.phone-info').should('contain', room.phoneInfo);
  });

  it('does not save chat room updates when the Cancel button is clicked', () => {
    goToExistingRoomPage();
    const room = updateRoomInfo(editChatButtonSelector, cancelButtonSelector);

    cy.get('h3.panel-title').should('not.contain', room.roomName);
    cy.get('p#roomDescription').should('not.contain', room.description);
    cy.get('span.phone-info').should('not.contain', room.phoneInfo);
  });

  it('does not save chat room updates when the modal Close button is clicked', () => {
    goToExistingRoomPage();
    const room = updateRoomInfo(
      editChatButtonSelector,
      modalCloseButtonSelector
    );

    cy.get('h3.panel-title').should('not.contain', room.roomName);
    cy.get('p#roomDescription').should('not.contain', room.description);
    cy.get('span.phone-info').should('not.contain', room.phoneInfo);
  });
});
