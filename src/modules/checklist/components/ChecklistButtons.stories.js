import React from 'react';
import { storiesOf, linkTo } from '@storybook/react';
import {
  storybookFrameDecorator,
  withInfoDecorator
} from '../../../../tools/storybook';
import ChecklistButtons from './ChecklistButtons';

storiesOf('ChecklistButtons', module)
  .addDecorator(withInfoDecorator)
  .addDecorator(storybookFrameDecorator)
  .add('ChecklistButtons', () => (
    <ChecklistButtons
      actions={{}}
      onChecklistItemAddRequest={linkTo('ChecklistItemEditorModal', 'new item')}
    />
  ));
