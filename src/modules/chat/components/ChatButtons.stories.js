import React from 'react';
import {storiesOf, linkTo} from '@kadira/storybook';
import ChatButtons from './ChatButtons';
import {storybookFrameDecorator} from '../../../../tools/storybook';

storiesOf('ChatButtons', module)
    .addDecorator(storybookFrameDecorator)

    .addWithInfo('ChatButtons',
        'Buttons displayed at the bottom of the "Chat" column',
        () => (
        <ChatButtons
            actions={{}}
            onChatMessageAddRequest={linkTo('ChatMessageEditorModal')}
            onChatParticipantsRequest={linkTo('ChatParticipantsModal')}
        />
    ));
