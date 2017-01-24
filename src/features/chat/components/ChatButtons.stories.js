import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import ChatButtons from './ChatButtons';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';

storiesOf('ChatButtons', module)
    .addDecorator(storyFrameDecorator)

    .add('ChatButtons', () => (
        <ChatButtons
            actions={{}}
            onChatMessageAddRequest={action('onChatMessageAddRequest')}
            onChatParticipantsRequest={action('onChatParticipantsRequest')}
        />
    ));
