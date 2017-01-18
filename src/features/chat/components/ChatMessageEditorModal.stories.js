import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import * as chatMessageType from '../chatMessageType';
import { ChatMessageEditorModal } from './ChatMessageEditorModal';

storiesOf('ChatMessageEditorModal', module)
    .add('ChatMessageEditorModal', () => (
        <ChatMessageEditorModal
            userId="userId"
            chatMessage={{
                chatMessageType: chatMessageType.CHAT,
                text: ''
            }}
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
            />
    ));
