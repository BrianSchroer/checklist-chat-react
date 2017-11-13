/* global cy */

/**
 * Cypress.io helper functions for the Checklist Chat site.
 */

const removePrefix = alias =>
  alias.startsWith('@') ? alias.substring(1) : alias;

/**
 * cy.route "alias" constants
 */
export const routeAlias = {
  getRooms: '@getRooms',
  getChatMessages: '@getChatMessages',
  getChecklistItems: '@getCheckistItems',
  addRoom: '@addRoom',
  updateRoom: '@updateRoom',
  addChatMessage: '@addChatMessage'
};

/**
 * Browse to the site's home page.
 */
export function goToHomePage() {
  cy.visit('/');
}

/**
 * Browse to chat room page for the first listed chat.
 * @param {*} assertEnteredRoomMessage
 */
export function goToChatRoomPage(assertEnteredRoomMessage = true) {
  goToHomePage();
  cy.get('ul.room-list>li>a:first').click({ force: true });

  if (assertEnteredRoomMessage) {
    cy.wait(routeAlias.addChatMessage).then(xhr => {
      const body = xhr.request.body;
      expect(body.chatMessageType).to.eq('Action');
      expect(body.text).to.eq('entered the room.');
    });
  }
}

/**
 * "Stub" API calls - "Gets" return data from fixture files. Updates return "success".
 */
export function stubApiCalls() {
  cy.server();

  cy.route('GET', '/rooms', 'fixture:rooms.json');

  cy.route(
    'GET',
    /\/chatMessages\?roomId=\d+&_sort=timeStamp/,
    'fixture:chatMessages.json'
  );

  cy.route(
    'GET',
    /\/checklistItems\?roomId=\d+&_sort=sequenceNumber/,
    'fixture:checklistItems.json'
  );

  cy
    .route({
      method: 'POST',
      url: '/rooms',
      status: 201,
      response: { body: {} }
    })
    .as(removePrefix(routeAlias.addRoom));

  cy
    .route({
      method: 'PATCH',
      url: /\/rooms\/\d+/,
      status: 200,
      response: { body: {} }
    })
    .as(removePrefix(routeAlias.updateRoom));

  cy
    .route({
      method: 'POST',
      url: '/chatMessages',
      status: 201,
      response: { body: {} }
    })
    .as(removePrefix(routeAlias.addChatMessage));
}
