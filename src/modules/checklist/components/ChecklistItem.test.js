import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import { checklistItemStatus } from '../../checklist';
import ChecklistItem from './ChecklistItem';

function dummyFunction() {}

describe('ChecklistItem', () => {
  const checklistItem = (
    <ChecklistItem
      checklistItem={{
        sequenceNumber: 1,
        status: checklistItemStatus.NOT_STARTED,
        description: 'item description',
        scheduledStartTime: '2016-12-08T14:00:00.222Z',
        scheduledEndTime: '2016-12-08T15:00:00.222Z',
        actualStartTime: '2016-12-08T14:03:00.222Z',
        actualEndTime: '2016-12-08T15:30:00.222Z',
        userName: 'Jabba Script'
      }}
      onEditRequest={dummyFunction}
    />
  );

  const snapshotHelper = new SnapshotHelper(checklistItem);
  const enzymeHelper = new EnzymeHelper(checklistItem);

  it('should render correctly', () => {
    snapshotHelper.test();
  });

  it('should handle edit request', () => {
    let wasCalled = false;

    enzymeHelper.shallow({
      onEditRequest: () => {
        wasCalled = true;
      }
    });

    enzymeHelper
      .findSingle('tbody > tr > td > button.checklist-item-button')
      .simulate('click');

    expect(wasCalled).toBe(true);
  });
});
