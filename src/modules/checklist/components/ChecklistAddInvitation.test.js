import React from 'react';
import { SnapshotHelper } from '../../../util/testHelpers';
import ChecklistAddInvitation from './ChecklistAddInvitation';

describe('ChecklistAddInvitation', () => {
  it('should render correctly', () => {
    SnapshotHelper.test(<ChecklistAddInvitation />);
  });
});
