import React from 'react';
import { SnapshotHelper, shallow, enzymeHelper } from '../../../util/testHelpers';
import ChecklistButtons from './ChecklistButtons';

const defaultProps = {
  onChecklistItemAddRequest: () => { }
};

function dummyFunction() { }

function overrideProps(propOverrides) {
  return Object.assign({}, defaultProps, propOverrides);
}

function shallowRender(propOverrides) {
  return shallow(<ChecklistButtons {...overrideProps(propOverrides) } />);
}

describe('ChecklistButtons', () => {
  const snapshotHelper = new SnapshotHelper(
    <ChecklistButtons
      onChecklistItemAddRequest={dummyFunction}
    />
  );

  it('should render correctly', () => {
    snapshotHelper.test();
  });

  it('should handle checklist item add request', () => {
    let wasCalled = false;

    const button = enzymeHelper.findSingle(
      shallowRender({ onChecklistItemAddRequest: () => { wasCalled = true; } }),
      'div > button.btn-primary');

    button.simulate('click');

    expect(wasCalled).toBe(true);
  });
});
