import * as cypressHelper from '../../../../tools/cypress/cypressHelper';
/* global Cypress, cy, before, beforeEach, describe, expect */
const headerSelector = 'div.navbar-nav';

describe('The home page', () => {
  beforeEach(() => {
    cypressHelper.stubApiCalls();
    cypressHelper.goToHomePage();
  });

  it('contains expected components', () => {
    cy.title().should('eq', 'Checklist Chat');
    cy.get(headerSelector);
    cy.contains('Welcome! Join a chat room:');
    cy.get(':button[value="Start a new chat..."]');

    cy.fixture('rooms.json').then(rooms => {
      cy.get('ul.room-list>li').should('have.lengthOf', rooms.length);
    });
  });

  it('displays a "no chats" found message when there are no existing rooms', () => {
    cy.route({ method: 'GET', url: '/rooms', response: [] });
    cy.visit('/');
    cy.contains(
      "There aren't any chats in progress right now. Why not start one?"
    );
  });

  it('redirects to the chat room page when a chat link is clicked', () => {
    const selector = 'ul.room-list>li>a:first';
    cy.get(selector).then($a => {
      const roomUrl = $a.attr('href');
      cy.get(selector).click({ force: true });
      cy.url().should('eq', `${Cypress.config('baseUrl')}${roomUrl}`);
    });
  });
});
