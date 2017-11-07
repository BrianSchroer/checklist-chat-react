/* global cy */

export const routeAlias = {
  getRooms: '@getRooms',
  getChatMessages: '@getChatMessages',
  getChecklistItems: '@getCheckistItems',
  addRoom: '@addRoom',
  updateRoom: '@updateRoom',
  addChatMessage: '@addChatMessage'
};

const removePrefix = alias =>
  alias.startsWith('@') ? alias.substring(1) : alias;

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

/**
 * Assert that no API calls were made to the specified cy.route alias.
 * @param {*} alias
 */
export function assertNoApiCallsTo(alias) {
  /* eslint-disable no-unused-vars */
  cy.on('fail', (err, runnable) => {
    /* esnlint-enable */
    expect(err.message).to.include('No request ever occurred.');
    return false;
  });

  cy.log(`verifying no API calls to ${alias}...`);
  cy.wait(alias, { timeout: 0 }).then(() => {
    throw new Error('Unexpected API call.');
  });
}
