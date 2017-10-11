import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  storybookFrameDecorator,
  withInfoDecorator
} from '../../../../tools/storybook';
import { checklistItemStatus } from '../../checklist';
import ChecklistItemStatusIcon from './ChecklistItemStatusIcon';

storiesOf('ChecklistItemStatusIcon', module)
  .addDecorator(withInfoDecorator)
  .addDecorator(storybookFrameDecorator)
  .add('icons', () => (
    <ul className="list-unstyled">
      {checklistItemStatus.options.map(opt => (
        <li key={opt.value}>
          <ChecklistItemStatusIcon status={opt.value} /> {opt.text}
        </li>
      ))}
    </ul>
  ));
