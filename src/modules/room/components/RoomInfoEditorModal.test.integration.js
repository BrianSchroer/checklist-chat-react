import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */

const modalDivSelector = 'div.checklist-chat-modal-dialog';
const newChatButtonSelector = ':button[value="Start a new chat..."]';
const editChatButtonSelector = 'div.room-info-panel-buttons>button.btn-primary';
const saveButtonSelector = ':submit[value="Save"]';
const cancelButtonSelector = ':button[value="Cancel"]';
const modalCloseButtonSelector = ':button.close';

const testRoomInfo = {
  id: undefined,
  roomName: 'Test roomName',
  description: 'Test description',
  phoneInfo: 'Test phoneInfo'
};

const { routeAlias } = cypressHelper;

beforeEach(() => {
  cypressHelper.stubApiCalls();
  cy.visit('/');
});

describe('The room info editor', () => {
  it('requires a room name', () => {
    cy.get(newChatButtonSelector).click();
    cy.get(':submit[value="Save"]').click();
    cy.get('div.alert').should('contain', 'Room name is required.');
    closeModal(cancelButtonSelector);
  });

  [
    {
      description: 'Cancel',
      selector: cancelButtonSelector
    },
    {
      description: 'modal close',
      selector: modalCloseButtonSelector
    }
  ].forEach(button => {
    it(`does not save a new chat when the ${button.description} button is clicked`, () => {
      cy.visit('/');
      testRoomInfoModal(newChatButtonSelector, cancelButtonSelector);
      assertNoUpdateApiCalls();
    });
  });

  it('saves a new chat when the Save button is clicked', () => {
    testRoomInfoModal(newChatButtonSelector, saveButtonSelector);
    cy
      .wait(routeAlias.addRoom)
      .then(xhr =>
        expect(xhr.requestBody.roomName).to.eq(testRoomInfo.roomName)
      );
    cy.wait(routeAlias.addChatMessage).then(xhr => {
      const body = xhr.request.body;
      expect(body.chatMessageType).to.eq('Action');
      expect(body.text).to.eq(`created new chat "${testRoomInfo.roomName}".`);
    });
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
    assertNoUpdateApiCalls();
  });

  [
    {
      description: 'Cancel',
      selector: cancelButtonSelector
    },
    {
      description: 'modal close',
      selector: modalCloseButtonSelector
    }
  ].forEach(button => {
    it(`does not save chat room updates when the ${button.description} button is clicked`, () => {
      goToExistingRoomPage();
      testRoomInfoModal(editChatButtonSelector, button.selector);
      assertNoUpdateApiCalls();
    });
  });

  it('saves chat room updates when the Save button is clicked', () => {
    goToExistingRoomPage();
    testRoomInfoModal(editChatButtonSelector, saveButtonSelector);
    cy
      .wait(routeAlias.updateRoom)
      .then(xhr =>
        expect(xhr.requestBody.roomName).to.eq(testRoomInfo.roomName)
      );
    cy.wait(routeAlias.addChatMessage).then(xhr => {
      const body = xhr.request.body;
      expect(body.chatMessageType).to.eq('Action');
      expect(body.text).to.eq('updated the room description / phone info.');
    });
  });
});

function assertNoUpdateApiCalls() {
  // Not sure if this works correctly - The "catch" for each of these says "@addRoom". Could be cypress or mocha bug, or developer misunderstanding
  cypressHelper.assertNoApiCallsTo(routeAlias.addRoom);
  cypressHelper.assertNoApiCallsTo(routeAlias.updateRoom);
  cypressHelper.assertNoApiCallsTo(routeAlias.addChatMessage);
}

function goToExistingRoomPage() {
  cy.get('ul.room-list>li>a:first').click({ force: true });
  cy.wait(routeAlias.addChatMessage).then(xhr => {
    const body = xhr.request.body;
    expect(body.chatMessageType).to.eq('Action');
    expect(body.text).to.eq('entered the room.');
  });
}

function closeModal(closeButtonSelector) {
  cy.get(closeButtonSelector).click();
  cy.get(modalDivSelector).should('not.exist');
}

function testRoomInfoModal(openButtonSelector, closeButtonSelector) {
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
    .type(testRoomInfo.roomName);
  cy
    .get('textarea[name="description"]')
    .clear()
    .type(testRoomInfo.description);
  cy
    .get('input[name="phoneInfo"]')
    .clear()
    .type(testRoomInfo.phoneInfo);

  closeModal(closeButtonSelector);
}
