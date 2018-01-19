import React from 'react';
import renderer from 'react-test-renderer';

/**
 * React component snapshot helper
 */
export default class SnapshotHelper {
  /**
   * Create new SnapshotHelper instance
   * @param {*} component - React component
   */
  constructor(component) {
    this.component = component.type;
    this.props = component.props;
    this.adjustProps = (props, propsAdjustments) =>
      Object.assign({}, props, propsAdjustments);
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
   * Adjust props that were passed to the constructor with propsAdjustments, then create
   * snapshot and assert that it matches previously accepted screenshot.
   */
  test = propsAdjustments => {
    const Component = this.component;
    const props = this.adjustProps(this.props, propsAdjustments);

    const snapshot = renderer.create(<Component {...props} />).toJSON();

    expect(snapshot).toMatchSnapshot();
  };

  /**
   * Create snapshot and assert that it matches previously accepted screenshot.
   * @param {*} component - React component1
   */
  static test(component) {
    new SnapshotHelper(component).test();
  }
}
