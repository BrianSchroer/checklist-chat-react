/* global Cypress, cy, before, describe, expect */

describe('The header', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.get('div.navbar-nav').as('header');
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
