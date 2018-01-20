import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import ChecklistButtons from './ChecklistButtons';

function dummyFunction() {}

describe('ChecklistButtons', () => {
  const checklistButtons = (
    <ChecklistButtons onChecklistItemAddRequest={dummyFunction} />
  );

  const snapshotHelper = new SnapshotHelper(checklistButtons);
  const enzymeHelper = new EnzymeHelper(checklistButtons);

  it('should render correctly', () => {
    snapshotHelper.test();
  });

  it('should handle checklist item add request', () => {
    let wasCalled = false;

    enzymeHelper.shallow({
      onChecklistItemAddRequest: () => {
        wasCalled = true;
      }
    });

    enzymeHelper.findSingle('div > button.btn-primary').simulate('click');

    expect(wasCalled).toBe(true);
  });
});
