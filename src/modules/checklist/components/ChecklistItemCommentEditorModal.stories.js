import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {ChecklistItemCommentEditorModal} from './ChecklistItemCommentEditorModal';

storiesOf('ChecklistItemCommentEditorModal', module)
    .add('ChecklistItemCommentEditorModal', () => (
        <ChecklistItemCommentEditorModal
            checklistItem={{
                sequenceNumber: 1,
                description: 'checklist item description',
                chatMessages: [
                    { id: 1, timeStamp: '2016-12-08T14:57:10.222Z', userName: 'user name', text: "existing comment" },
                    { id: 2, timeStamp: '2016-12-08T14:57:10.222Z', userName: 'user name', text: "existing comment" }
                ]
            }}
            shouldFocus={false}
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
         />
    ));
