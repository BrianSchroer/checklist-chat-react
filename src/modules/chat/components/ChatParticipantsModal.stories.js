import React from 'react';
import {storiesOf, linkTo} from '@storybook/react';
import {ChatParticipantsModal} from './ChatParticipantsModal';

storiesOf('ChatParticipantsModal', module)
    .add('ChatParticipantsModal', () => (
        <ChatParticipantsModal
            chatParticipants={[
                {name: 'name', department: 'department', title: 'title', connection: 'connection' },
                {name: 'name', department: 'department', title: 'title', connection: 'connection' },
                {name: 'name', department: 'department', title: 'title', connection: 'connection' },
                {name: 'name', department: 'department', title: 'title', connection: 'connection' },
                {name: 'name', department: 'department', title: 'title', connection: 'connection' },
                {name: 'name', department: 'department', title: 'title', connection: 'connection' }
            ]}
            onCloseRequest={linkTo('ChatButtons')} />
    ));
