import assert from 'assert';

const enzymeHelper = class {

    /**
     * This method wraps the enzyme find method with the ability to perform
     * "nested" finds (e.g. "div.main > div.sub > p.instructions").
     *
     * @static
     * @param {any} wrapper to be searched
     * @param {any} selector for the search
     * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
     *      that selector may be wrapped with.
     * @returns array of found results
     */
    static find(wrapper, selector, higherOrderComponent) {
        const selectors = selector.split('>').map(node => node.trim());
        let parent = wrapper;
        let found = [];

        for (let i = 0; i < selectors.length; i++) {
            found = parent.find(selectors[i]);

            if (found.length == 0) {
                if (higherOrderComponent) {
                    found = parent.find(`${higherOrderComponent}(${selectors[i]})`);
                }

                if (found.length == 0) {
                    break;
                }
            }
        }

        return found;
    }

    /**
     * Call enzyme find and assert the expected match count.
     *
     * @static
     * @param {number} expectedCount
     * @param {any} wrapper to be searched
     * @param {any} selector for the search (can be "nested"; e.g. "div > span")
     * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
     *      that selector may be wrapped with.
     * @returns array of found results
     */
    static assertFindCount(expectedCount, wrapper, selector, higherOrderComponent) {
        const found = enzymeHelper.find(wrapper, selector, higherOrderComponent);

        if (found.length != expectedCount) {
            const errorMessage =
                [
                    `Expected ${expectedCount} find for selector "${selector}", but found ${found.length}.`,
                    '',
                    this.getDebugHtml(wrapper),
                    ''
                ]
                .join('\n');

            assert.equal(found.length, expectedCount, errorMessage);
        }

        return found;
    }

    /**
     * Call enzyme find and assert that no matches are found.
     *
     * @static
     * @param {any} wrapper to be searched
     * @param {any} selector for the search (can be "nested"; e.g. "div > span")
     * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
     *      that selector may be wrapped with.
     */
    static assertNoMatch(wrapper, selector, higherOrderComponent) {
        this.assertFindCount(0, wrapper, selector, higherOrderComponent);
    }

    /**
     * Call enzyme find and assert that one and only one match is found.
     *
     * @static
     * @param {any} wrapper to be searched
     * @param {any} selector for the search (can be "nested"; e.g. "div > span")
     * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
     *      that selector may be wrapped with.
     * @returns the found node
     */
    static findSingle(wrapper, selector, higherOrderComponent) {
        const found = this.assertFindCount(1, wrapper, selector, higherOrderComponent);
        return found.first();
    }

    /**
     * Returns an HTML-like string of the wrapper for debugging purposes. Useful to
     * log to the console when tests are not passing when you expect them to.
     *
     * @static
     * @param {any} wrapper
     * @returns the resulting string
     */
    static getDebugHtml(wrapper) {
        return wrapper.debug();
    }

    /**
     * Logs an HTML-like string of the wrapper for debugging purposes. Useful to
     * log to the console when tests are not passing when you expect them to.
     *
     * @static
     * @param {any} wrapper
     * @returns the resulting string
     */
    static logDebugHtml(wrapper) {
        console.log(this.getDebugHtml(wrapper));  // eslint-disable-line no-console
    }
};

export default enzymeHelper;
