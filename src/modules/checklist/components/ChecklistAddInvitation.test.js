import React from 'react';
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import ChecklistAddInvitation from './ChecklistAddInvitation';

describe('ChecklistAddInvitation', () => {
  it('should render correctly', () => {
    SnapshotHelper.test(<ChecklistAddInvitation />);
  });
});
