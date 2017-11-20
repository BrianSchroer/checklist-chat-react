/* global cy, assert */

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
 * "Stub" API calls for all route aliases.
 */
export function stubApiCalls() {
  return stubApiCallsFor(Object.keys(routeAlias).map(key => routeAlias[key]));
}

/**
 * "Stub" API calls for specific route aliases.
 * @param {*} routeAliases that should be called (array);
 */
export function stubApiCallsFor(routeAliases) {
  const stubs = new Map();

  stubs.set(routeAlias.getRooms, {
    route: {
      method: 'GET',
      url: '/rooms'
    },
    fixture: 'rooms.json'
  });

  stubs.set(routeAlias.getChatMessages, {
    route: {
      method: 'GET',
      url: /\/chatMessages\?roomId=\d+&_sort=timeStamp/
    },
    fixture: 'chatMessages.json'
  });

  stubs.set(routeAlias.getChecklistItems, {
    route: {
      method: 'GET',
      url: /\/checklistItems\?roomId=\d+&_sort=sequenceNumber/
    },
    fixture: 'checklistItems.json'
  });

  stubs.set(routeAlias.addChatMessage, {
    route: {
      method: 'POST',
      url: '/chatMessages',
      status: 201,
      response: { body: {} }
    }
  });

  stubs.set(routeAlias.addChecklistItem, {
    route: {
      method: 'POST',
      url: '/checklistItems',
      status: 201,
      response: { body: {} }
    }
  });

  stubs.set(routeAlias.addRoom, {
    route: {
      method: 'POST',
      url: '/rooms',
      status: 201,
      response: { body: {} }
    }
  });

  stubs.set(routeAlias.updateChecklistItem, {
    route: {
      method: 'PATCH',
      url: /\/checklistItems\/\d+/,
      status: 200,
      response: { body: {} }
    }
  });

  stubs.set(routeAlias.updateRoom, {
    route: {
      method: 'PATCH',
      url: /\/rooms\/\d+/,
      status: 200,
      response: { body: {} }
    }
  });

  cy.server();

  for (let [alias, routeInfo] of stubs.entries()) {
    const unprefixedAlias = removePrefix(alias);
    routeInfo.alias = alias;
    routeInfo.wasUnexpectedlyCalled = false;

    if (routeAliases.includes(alias)) {
      setRoute(unprefixedAlias, routeInfo);
    } else {
      setUnexpectedRoute(unprefixedAlias, routeInfo);
    }
  }

  return stubs;
}

export function assertNoUnexpectedApiCalls(stubs) {
  const unexpectedlyCalledAliases = [...stubs]
    .filter(([, stub]) => stub.wasUnexpectedlyCalled)
    .map(([alias]) => alias);

  if (unexpectedlyCalledAliases.length === 0) {
    assert.isOk(true, 'No unexpected API calls were made.');
    return;
  }

  assert(
    false,
    `Unexpected API call(s) to ${unexpectedlyCalledAliases.join(', ')}.`
  );
}

function setRoute(alias, routeInfo) {
  if (routeInfo.fixture) {
    cy.fixture(routeInfo.fixture).then(responseJson => {
      const routeWithFixtureResponse = Object.assign({}, routeInfo.route, {
        response: responseJson
      });
      cy.route(routeWithFixtureResponse).as(alias);
    });
  } else {
    cy.route(routeInfo.route).as(alias);
  }
}

function setUnexpectedRoute(alias, options) {
  const unexpectedRoute = Object.assign({}, options.route, {
    onRequest: () => {
      options.wasUnexpectedlyCalled = true;
    }
  });

  cy.route(unexpectedRoute).as(alias);
}
