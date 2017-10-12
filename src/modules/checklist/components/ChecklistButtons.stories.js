import React from 'react';
import { storybookStories, linkTo } from '../../../../tools/storybook';
import ChecklistButtons from './ChecklistButtons';

storybookStories('ChecklistButtons').add('ChecklistButtons', () => (
  <ChecklistButtons
    actions={{}}
    onChecklistItemAddRequest={linkTo('ChecklistItemEditorModal', 'new item')}
  />
));
