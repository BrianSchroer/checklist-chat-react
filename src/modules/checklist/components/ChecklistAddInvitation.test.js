import React from 'react';
import {snapshotHelper} from '../../../util/testHelpers';
import ChecklistAddInvitation from './ChecklistAddInvitation';

describe('ChecklistAddInvitation', () => {
    it('should render correctly', () => {
        snapshotHelper.assertMatch(<ChecklistAddInvitation />);
    });
});
