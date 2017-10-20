/* global cy, describe, expect */

describe('The home page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('contains a header', () => {
    cy.get('div.navbar-nav');
  });

  it('contains a "Start a new chat..." button', () => {
    cy
      .get('input.btn-primary')
      .should('have.attr', 'value', 'Start a new chat...');
  });

  it('contains a welcome message', () => {
    // If not found immediately, will wait up to 30 seconds until it appears:
    cy.contains('Welcome! Join a chat room:');
  });

  // TODO: mock API responses, test no rooms
});
