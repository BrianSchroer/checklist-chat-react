import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */

const modalDivSelector = 'div.checklist-chat-modal-dialog';
const newChatButtonSelector = ':button[value="Start a new chat..."]';
const editChatButtonSelector = 'div.room-info-panel-buttons>button.btn-primary';
const saveButtonSelector = ':submit[value="Save"]';
const cancelButtonSelector = ':button[value="Cancel"]';
const modalCloseButtonSelector = ':button.close';

const { routeAlias } = cypressHelper;

const testRoomInfo = {
  id: undefined,
  roomName: 'Test roomName',
  description: 'Test description',
  phoneInfo: 'Test phoneInfo'
};

describe('The room info editor', () => {
  let _stubs;

  afterEach(() => {
    cypressHelper.assertNoUnexpectedApiCalls(_stubs);
  });

  it('requires a room name', () => {
    _stubs = initialize(routeAlias.getRooms);
    cypressHelper.goToHomePage();
    cy.get(newChatButtonSelector).click();
    cy.get(':submit[value="Save"]').click();
    cy.get('div.alert').should('contain', 'Room name is required.');
    closeModal(cancelButtonSelector);
  });

  it('displays expected room info for an existing chat room', () => {
    _stubs = initialize(
      routeAlias.getRooms,
      routeAlias.getChatMessages,
      routeAlias.getChecklistItems,
      routeAlias.addChatMessage
    );
    cypressHelper.goToChatRoomPage();
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
      _stubs = initialize(routeAlias.getRooms);
      testRoomInfoModal(newChatButtonSelector, cancelButtonSelector);
    });
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
      _stubs = initialize(
        routeAlias.getRooms,
        routeAlias.getChatMessages,
        routeAlias.getChecklistItems,
        routeAlias.addChatMessage
      );
      cypressHelper.goToChatRoomPage();
      testRoomInfoModal(editChatButtonSelector, button.selector);
    });
  });
});

describe('The room info editor (updates)', () => {
  beforeEach(() => {
    initialize();
  });

  it('saves a new chat when the Save button is clicked', () => {
    cypressHelper.goToHomePage();
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

  it('saves chat room updates when the Save button is clicked', () => {
    cypressHelper.goToChatRoomPage();
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

function initialize(...routeAliases) {
  const stubs = routeAliases.length
    ? cypressHelper.stubApiCallsFor(routeAliases)
    : cypressHelper.stubApiCalls();

  cypressHelper.goToHomePage();

  return stubs;
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
