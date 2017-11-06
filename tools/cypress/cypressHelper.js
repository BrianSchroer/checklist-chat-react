/* global cy */

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
