/* global Cypress, cy, before, after, describe, expect */

before(() => {
  cy.server();
  cy.route('/rooms', 'fixture:rooms.json');
  cy.visit('/');
});

after(() => {
  cy.server({ enable: false });
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

  it('redirects to the chat room page when a chat link is clicked', () => {
    const selector = 'ul.room-list>li>a:first';
    cy.get(selector).then($a => {
      const roomUrl = $a.attr('href');
      cy.get(selector).click();
      cy.url().should('eq', `${Cypress.config('baseUrl')}${roomUrl}`);
    });
  });

  it('displays a "no chats" found message when tere are no existing rooms', () => {
    cy.server();
    cy.route('/rooms', 'fixture:rooms-none.json');
    cy.visit('/');
    cy.contains(
      "There aren't any chats in progress right now. Why not start one?"
    );
  });
});
