import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import ChatButtons from './ChatButtons';
import {storybookFrameDecorator} from '../../../../tools/storybook';

storiesOf('ChatButtons', module)
    .addDecorator(storybookFrameDecorator)

    .add('ChatButtons', () => (
        <ChatButtons
            actions={{}}
            onChatMessageAddRequest={action('onChatMessageAddRequest')}
            onChatParticipantsRequest={action('onChatParticipantsRequest')}
        />
    ));
