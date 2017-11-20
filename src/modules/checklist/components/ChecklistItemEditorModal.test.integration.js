import * as checklistItemStatus from '../checklistItemStatus';
import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global cy, beforeEach, describe, expect */

const modalDivSelector = 'div.checklist-chat-modal-dialog';
const newItemButtonSelector =
  'div.chat-room-buttons button.checklist-item-button';
const editItemButtonSelector =
  'table.checklist-table button.checklist-item-button:first';
const saveButtonSelector = ':submit[value="Save"]';
const cancelButtonSelector = ':button[value="Cancel"]';
const modalCloseButtonSelector = ':button.close';

const { routeAlias } = cypressHelper;

const testChecklistItem = {
  status: checklistItemStatus.IN_PROGRESS,
  description: 'Test Description',
  scheduledStartTime: '7:00 PM',
  scheduledEndTime: '7:30 PM',
  actualStartTime: '7:05 PM',
  actualEndTime: '7:25 PM',
  userName: 'Test User Name'
};

describe('The checklist item editor', () => {
  let _stubs;

  beforeEach(() => {
    _stubs = initialize({ readOnly: true });
  });

  afterEach(() => {
    cypressHelper.assertNoUnexpectedApiCalls(_stubs);
  });

  it('requires a description', () => {
    withNewItemModal(() => {
      cy.get(saveButtonSelector).click();
      cy.get('div.alert').should('contain', 'Description is required.');
    });
  });

  it('displays expected status selector values', () => {
    withNewItemModal(() => {
      const opts = checklistItemStatus.options;
      cy
        .get('select[name="status"]')
        .as('selector')
        .find('option')
        .should('have.length', opts.length);

      opts.forEach(opt => {
        cy
          .get('@selector')
          .find(`option[value="${opt.value}"]`)
          .should('have.text', opt.text);
      });
    });
  });

  it('displays expected defaults for a new item', () => {
    cy.fixture('checklistItems.json').then(items => {
      const expectedCount = items.length + 1;
      withNewItemModal(() => {
        cy
          .get('select[name="sequenceNumber"]')
          .should('have.value', expectedCount.toString())
          .find('option')
          .should('have.length', expectedCount);
        cy
          .get('select[name="status"]')
          .should('have.value', checklistItemStatus.NOT_STARTED);
      });
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
    it(`does not save a new checklist item when the ${button.description} button is clicked`, () => {
      testChecklistItemModal(newItemButtonSelector, button.selector);
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
    it(`does not save checklist item updates when the ${button.description} button is clicked`, () => {
      testChecklistItemModal(editItemButtonSelector, button.selector);
    });
  });
});

describe('The checklist item editor (updates)', () => {
  beforeEach(() => {
    initialize();
  });

  it('saves a new checklist item when the Save button is clicked', () => {
    cy.fixture('rooms.json').then(rooms => {
      cy.fixture('checklistItems.json').then(items => {
        testChecklistItemModal(newItemButtonSelector, saveButtonSelector);
        const newItem = Object.assign({}, testChecklistItem, {
          roomId: rooms[0].id,
          id: null,
          sequenceNumber: items.length + 1
        });
        cy.wait(routeAlias.addChecklistItem).then(xhr => {
          expect(xhr.requestBody).to.deep.equal(newItem);
        });
        cy.wait(routeAlias.addChatMessage).then(xhr => {
          const body = xhr.request.body;
          expect(body.chatMessageType).to.eq('Action');
          expect(body.text).to.eq(
            `added checklist item ${newItem.sequenceNumber} - "${newItem.description}".`
          );
        });
      });
    });
  });

  it('saves checklist item updates when the Save button is clicked', () => {
    cy.fixture('checklistItems.json').then(items => {
      testChecklistItemModal(editItemButtonSelector, saveButtonSelector);
      const updatedItem = Object.assign({}, items[0], testChecklistItem);
      cy.wait(routeAlias.updateChecklistItem).then(xhr => {
        expect(xhr.requestBody).to.deep.equal(updatedItem);
      });
      cy.wait(routeAlias.addChatMessage).then(xhr => {
        const body = xhr.request.body;
        expect(body.chatMessageType).to.eq('Action');
        expect(body.text).to.eq(
          `updated checklist item ${updatedItem.sequenceNumber} - "${updatedItem.description}".`
        );
      });
    });
  });
});

function initialize(options = { readOnly: false }) {
  const stubs =
    options && options.readOnly
      ? cypressHelper.stubApiCalls([
          routeAlias.getRooms,
          routeAlias.getChatMessages,
          routeAlias.getChatMessages,
          routeAlias.addChatMessage
        ])
      : cypressHelper.stubApiCalls();

  cypressHelper.goToChatRoomPage();

  return stubs;
}

function openModal(openButtonSelector) {
  cy.get(openButtonSelector).click();
  verifyModalIsOpen(openButtonSelector);
}

function verifyModalIsOpen(openButtonSelector) {
  cy.get('div.checklist-chat-modal-dialog');
  cy
    .get('h4.modal-title')
    .should(
      'contain',
      openButtonSelector === newItemButtonSelector
        ? 'Add New Checklist Item'
        : 'Edit Checklist Item'
    );
}

function closeModal(closeButtonSelector) {
  cy.get(closeButtonSelector).click();
  verifyModalIsClosed();
}

function verifyModalIsClosed() {
  cy.get(modalDivSelector).should('not.exist');
}

function withNewItemModal(callback) {
  openModal(newItemButtonSelector);

  callback();

  closeModal(cancelButtonSelector);
}

function testChecklistItemModal(openButtonSelector, closeButtonSelector) {
  openModal(openButtonSelector);

  Object.keys(testChecklistItem).forEach(key => {
    const value = testChecklistItem[key];
    switch (key) {
      case 'status':
        cy.get(`select[name="${key}"]`).select(value);
        break;
      case 'description':
        cy
          .get(`textarea[name="${key}"]`)
          .clear()
          .type(value);
        break;
      default:
        cy
          .get(`input[name="${key}"]`)
          .clear()
          .type(value);
        break;
    }
  });

  closeModal(closeButtonSelector);
}
