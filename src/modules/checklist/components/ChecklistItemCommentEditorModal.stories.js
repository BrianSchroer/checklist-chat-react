import React from 'react';
import { storiesOf, linkTo } from '@storybook/react';
import { withInfoDecorator } from '../../../../tools/storybook';
import { ChecklistItemCommentEditorModal } from './ChecklistItemCommentEditorModal';

storiesOf('ChecklistItemCommentEditorModal', module)
  .addDecorator(withInfoDecorator)
  .add('ChecklistItemCommentEditorModal', () => (
    <ChecklistItemCommentEditorModal
      checklistItem={{
        sequenceNumber: 1,
        description: 'checklist item description',
        chatMessages: [
          {
            id: 1,
            timeStamp: '2016-12-08T14:57:10.222Z',
            userName: 'user name',
            text: 'existing comment'
          },
          {
            id: 2,
            timeStamp: '2016-12-08T14:57:10.222Z',
            userName: 'user name',
            text: 'existing comment'
          }
        ]
      }}
      shouldFocus={false}
      actions={{}}
      onCloseRequest={linkTo('ChecklistItemEditorModal', 'existing item')}
    />
  ));
