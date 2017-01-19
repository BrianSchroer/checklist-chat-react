import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {ChatRoomPage} from './ChatRoomPage';

storiesOf('ChatRoomPage', module)
    .add('ChatRoomPage', () => (
        <ChatRoomPage
            routeParams={{id: 123}}
            userId="userId"
            room={{
                roomId: 123,
                roomName: "room name",
                description: "room description"
            }}
            chatMessages={[

            ]}
            checklistItems={[

            ]}
            actions={{
                joinChat: (roomId, userId) => action('joinChat')
            }} />
    ));
