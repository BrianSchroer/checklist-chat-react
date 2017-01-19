import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {ChecklistItemCommentEditorModal} from './ChecklistItemCommentEditorModal';

storiesOf('ChecklistItemCommentEditorModal', module)
    .add('ChecklistItemCommentEditorModal', () => (
        <ChecklistItemCommentEditorModal
            userId="userId"
            checklistItem={{
                sequenceNumber: 1,
                description: 'checklist item description',
                chatMessages: [
                    {  timeStamp: '2016-12-08T14:57:10.222Z', userName: 'user name', text: "existing comment" },
                    {  timeStamp: '2016-12-08T14:57:10.222Z', userName: 'user name', text: "existing comment" }
                ]
            }}
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
         />
    ));
