import React from 'react';
import {storiesOf, linkTo} from '@kadira/storybook';
import ChatButtons from './ChatButtons';
import {storybookFrameDecorator} from '../../../../tools/storybook';

storiesOf('ChatButtons', module)
    .addDecorator(storybookFrameDecorator)

    .add('ChatButtons', () => (
        <ChatButtons
            actions={{}}
            onChatMessageAddRequest={linkTo('ChatMessageEditorModal')}
            onChatParticipantsRequest={linkTo('ChatParticipantsModal')}
        />
    ));
