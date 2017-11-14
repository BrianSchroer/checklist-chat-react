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
  addChatMessage: '@addChatMessage',
  addChecklistItem: '@addChecklistItem',
  addRoom: '@addRoom',
  getRooms: '@getRooms',
  getChatMessages: '@getChatMessages',
  getChecklistItems: '@getCheckistItems',
  updateChecklistItem: '@updateChecklistItem',
  updateRoom: '@updateRoom'
};

/**
 * Browse to the site's home page.
 */
export function goToHomePage() {
  cy.visit('/');
}

/**
 * Browse to chat room page for the first listed chat.
 */
export function goToChatRoomPage() {
  goToHomePage();

  cy.get('ul.room-list>li>a:first').click({ force: true });

  cy.fixture('rooms.json').then(rooms => {
    cy.wait(routeAlias.addChatMessage).then(xhr => {
      const body = xhr.request.body;
      expect(body.chatMessageType).to.eq('Action');
      expect(body.roomId).to.eq(rooms[0].id.toString());
      expect(body.text).to.eq('entered the room.');
    });
  });
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
      url: '/checklistItems',
      status: 201,
      response: { body: {} }
    })
    .as(removePrefix(routeAlias.addChecklistItem));

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
      url: /\/checklistItems\/\d+/,
      status: 200,
      response: { body: {} }
    })
    .as(removePrefix(routeAlias.updateChecklistItem));

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
