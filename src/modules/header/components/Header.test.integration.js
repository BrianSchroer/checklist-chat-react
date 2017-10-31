/* global Cypress, cy, before, after, describe, expect */

describe('The header', () => {
  before(() => {
    cy.server();
    cy.route('/rooms', 'fixture:rooms.json');
    cy.visit('/');
  });

  beforeEach(() => {
    cy.get('div.navbar-nav').as('header');
  });

  after(() => {
    cy.server({ enable: false });
  });

  it('contains the site logo', () => {
    cy.get('@header').find('div.header-logo-img');
  });

  it('contains a link to the home page', () => {
    cy
      .get('@header')
      .find('a.navbar-brand')
      .should('have.attr', 'href', '/')
      .click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });
});
