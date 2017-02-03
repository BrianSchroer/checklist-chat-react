import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {ChatMessageEditorModal} from './ChatMessageEditorModal';

storiesOf('ChatMessageEditorModal', module)
    .add('ChatMessageEditorModal', () => (
        <ChatMessageEditorModal
            userId="userId"
            shouldFocus={false}
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
            />
    ));
