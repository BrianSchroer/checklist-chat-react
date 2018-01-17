import React from 'react';
import { SnapshotHelper, shallow, enzymeHelper } from '../../../util/testHelpers';
import { checklistItemStatus } from '../../checklist';
import ChecklistItem from './ChecklistItem';

const defaultProps = {
  checklistItem: {
    sequenceNumber: 1,
    status: checklistItemStatus.NOT_STARTED,
    description: "item description",
    scheduledStartTime: '2016-12-08T14:00:00.222Z',
    scheduledEndTime: '2016-12-08T15:00:00.222Z',
    actualStartTime: '2016-12-08T14:03:00.222Z',
    actualEndTime: '2016-12-08T15:30:00.222Z',
    userName: 'Jabba Script'
  },
  onEditRequest: () => { }
};

function overrideProps(propOverrides) {
  return Object.assign({}, defaultProps, propOverrides);
}

function render(propOverrides = {}) {
  return shallow(<ChecklistItem {...overrideProps(propOverrides) } />);
}

describe('ChecklistItem', () => {
  it('should render correctly', () => {
    SnapshotHelper.test(<ChecklistItem {...defaultProps} />);
  });

  it('should handle edit request', () => {
    let wasCalled = false;

    const button = enzymeHelper.findSingle(
      render({ onEditRequest: () => { wasCalled = true; } }),
      'tbody > tr > td > button.checklist-item-button');

    button.simulate('click');
    expect(wasCalled).toBe(true);
  });
});
