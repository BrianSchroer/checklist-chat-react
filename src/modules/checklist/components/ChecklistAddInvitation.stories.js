import React from 'react';
import { storybookStories } from '../../../../tools/storybook';
import ChecklistAddInvitation from './ChecklistAddInvitation';

storybookStories('ChecklistAddInvitation').add('ChecklistAddInvitation', () => (
  <table className="table checklist-table">
    <ChecklistAddInvitation />
  </table>
));
