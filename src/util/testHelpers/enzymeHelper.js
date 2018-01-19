import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default class EnzymeHelper {
  /**
   * Create new EnzymeHelper instance
   * @param {*} component - React component
   */
  constructor(component) {
    this.component = component.type;
    this.props = component.props;
    this.adjustProps = (props, propsAdjustments) =>
      Object.assign({}, props, propsAdjustments);
    this.wrapper = null;
  }

  /**
   * Fluent syntax helper to specify a callback function to be called by the test() function
   * to assign propsAdjustments to the props passed that were passed via the constructor.
   * (Defaults to assigning top-level props only.)
   */
  withPropsAdjuster = propsAdjuster => {
    this.adjustProps = propsAdjuster;
    return this;
  };

  /**
   * Creates a new props object by calling the propsAdjuster function to apply
   * propsAdjustments (if any) to the props passed to the constructor, then
   * returns a "shallowWrapper" of the component with the specified props.
   */
  shallow = propsAdjustments => {
    const Component = this.component;
    const props = this.adjustProps(this.props, propsAdjustments);

    return (this.wrapper = shallow(<Component {...props} />));
  };

  /**
   * This method wraps the enzyme find method with the ability to perform
   * "nested" finds (e.g. "div.main > div.sub > p.instructions") for the shallow "wrapper"
   * created/returned by a previous call to the "shallow" function.
   *
   * @static
   * @param {any} selector for the search
   * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
   *      that selector may be wrapped with.
   * @returns array of found results
   */
  find = (selector, higherOrderComponent) => {
    return this.findIn(this.wrapper, selector, higherOrderComponent);
  };

  /**
   * This method wraps the enzyme find method with the ability to perform
   * "nested" finds (e.g. "div.main > div.sub > p.instructions").
   *
   * @param {any} wrapper to be searched
   * @param {any} selector for the search
   * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
   *      that selector may be wrapped with.
   * @returns array of found results
   */
  findIn = (wrapper, selector, higherOrderComponent) => {
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
  };

  /**
   * Call "find" function and assert the expected match count.
   *
   * @param {number} expectedCount
   * @param {any} selector for the search (can be "nested"; e.g. "div > span")
   * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
   *      that selector may be wrapped with.
   * @returns array of found results
   */
  assertFindCount = (expectedCount, selector, higherOrderComponent) => {
    return this.assertFindCountIn(
      this.wrapper,
      expectedCount,
      selector,
      higherOrderComponent
    );
  };

  /**
   * Call "findIn" function and assert the expected match count.
   *
   * @param {any} wrapper to be searched
   * @param {number} expectedCount
   * @param {any} selector for the search (can be "nested"; e.g. "div > span")
   * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
   *      that selector may be wrapped with.
   * @returns array of found results
   */
  assertFindCountIn = (
    wrapper,
    expectedCount,
    selector,
    higherOrderComponent
  ) => {
    const found = this.findIn(wrapper, selector, higherOrderComponent);

    if (found.length != expectedCount) {
      const errorMessage = [
        `Expected ${expectedCount} element(s) for selector "${selector}"` +
          `, but found ${found.length}.`,
        '',
        this.getDebugHtml(wrapper),
        ''
      ].join('\n');

      throw new Error(errorMessage);
    }

    return found;
  };

  /**
   * Call "find" method and assert that no matches are found.
   *
   * @param {any} selector for the search (can be "nested"; e.g. "div > span")
   * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
   *      that selector may be wrapped with.
   */
  assertNoMatch = (selector, higherOrderComponent) => {
    this.assertNoMatchIn(this.wrapper, selector, higherOrderComponent);
  };

  /**
   * Call "findIn" method and assert that no matches are found.
   *
   * @param {any} wrapper to be searched
   * @param {any} selector for the search (can be "nested"; e.g. "div > span")
   * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
   *      that selector may be wrapped with.
   */
  assertNoMatchIn = (wrapper, selector, higherOrderComponent) => {
    this.assertFindCountIn(wrapper, 0, selector, higherOrderComponent);
  };

  /**
   * Call "find" function and assert that one and only one match is found.
   *
   * @param {any} selector for the search (can be "nested"; e.g. "div > span")
   * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
   *      that selector may be wrapped with.
   * @returns the found node
   */
  findSingle = (selector, higherOrderComponent) => {
    return this.findSingleIn(this.wrapper, selector, higherOrderComponent);
  };

  /**
   * Call "findIn" function and assert that one and only one match is found.
   *
   * @param {any} wrapper to be searched
   * @param {any} selector for the search (can be "nested"; e.g. "div > span")
   * @param {string} higherOrderComponent = optional higher-order component (e.g. "Connect")
   *      that selector may be wrapped with.
   * @returns the found node
   */
  findSingleIn = (wrapper, selector, higherOrderComponent) => {
    const found = this.assertFindCountIn(
      wrapper,
      1,
      selector,
      higherOrderComponent
    );

    return found.first();
  };

  /**
   * Returns an HTML-like string of the shallow wrapper for debugging purposes. Useful to
   * log to the console when tests are not passing when you expect them to.
   *
   * @param {any} wrapper (if not passed, uses the wrapper retrieved/returned by preceding "shallow" function call)
   * @returns the resulting string
   */
  getDebugHtml = wrapper => (wrapper || this.wrapper).debug();

  /**
   * Logs an HTML-like string of the wrapper for debugging purposes. Useful to
   * log to the console when tests are not passing when you expect them to.
   *
   * @param {any} wrapper (if not passed, uses the wrapper retrieved/returned by preceding "shallow" function call)
   * @returns the resulting string
   */
  logDebugHtml = wrapper =>
    console.log(this.getDebugHtml(wrapper || this.wrapper)); // eslint-disable-line no-console
}
