/* global Cypress, cy, before, describe, expect */
function typeInto(selector, text) {
  cy.get(selector).type(text, { delay: 0 });
}

function populateNewRoomForm(buttonSelector) {
  const roomName = `New room ${new Date().toISOString()}`;
  const description = `${roomName} description`;

  cy.get(':button[value="Start a new chat..."]').click();

  cy.get('div.checklist-chat-modal-dialog');
  cy.get('h4.modal-title').should('contain', 'Add Chat Room');
  typeInto('input[name="roomName"]', roomName);
  typeInto('textarea[name="description"]', description);
  typeInto('input[name="phoneInfo"]', `${roomName} phone info`);
  cy.get(buttonSelector).click();

  return roomName;
}

before(() => {
  cy.server();
  cy.route('/rooms/*', 'fixture:rooms.json');
  cy.visit('/');
});

describe('The home page', () => {
  it('contains a header', () => {
    cy.get('div.navbar-nav');
  });

  it('has the expected title', () => {
    cy.title().should('eq', 'Checklist Chat');
  });

  it('contains a welcome message', () => {
    // If not found immediately, will wait up to 30 seconds until it appears:
    cy.contains('Welcome! Join a chat room:');
  });

  it('contains a list of existing chat rooms', () => {
    cy.get('ul.room-list>li').should('have.length.above', 0);
  });

  it('contains a "Start a new chat..." button', () => {
    cy.get(':button[value="Start a new chat..."]');
  });

  it('does not save a new chat when the Cancel button is clicked', () => {
    cy.get('ul.room-list>li').then($rooms => {
      const roomCount = $rooms.length;
      populateNewRoomForm(':button[value="Cancel"]');
      cy.get('ul.room-list>li').should('have.length', roomCount);
    });
  });

  it('does not save a new chat when the modal close button is clicked', () => {
    cy.get('ul.room-list>li').then($rooms => {
      const roomCount = $rooms.length;
      populateNewRoomForm(':button.close');
      cy.get('ul.room-list>li').should('have.length', roomCount);
    });
  });

  it('allows starting a new chat', () => {
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

  it('redirects to the chat room page when a chat link is clicked', () => {
    const selector = 'ul.room-list>li>a:first';
    cy.get(selector).then($a => {
      const roomUrl = $a.attr('href');
      cy.get(selector).click();
      cy.url().should('eq', `${Cypress.config('baseUrl')}${roomUrl}`);
    });
  });
});
