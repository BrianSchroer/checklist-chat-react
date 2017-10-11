import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  storybookFrameDecorator,
  withInfoDecorator
} from '../../../../tools/storybook';
import ChecklistAddInvitation from './ChecklistAddInvitation';

storiesOf('ChecklistAddInvitation', module)
  .addDecorator(withInfoDecorator)
  .addDecorator(storybookFrameDecorator)
  .add('ChecklistAddInvitation', () => (
    <table className="table checklist-table">
      <ChecklistAddInvitation />
    </table>
  ));
