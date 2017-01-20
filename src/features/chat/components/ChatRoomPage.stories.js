import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import * as chatMessageType from '../chatMessageType';
import * as checklistItemStatus from '../../../features/checklist/checklistItemStatus';
import {ChatRoomPage} from './ChatRoomPage';

storiesOf('ChatRoomPage', module)
    .add('ChatRoomPage', () => (
        <div style={{height: "500px", display: "flex"}}>
        <ChatRoomPage
            routeParams={{id: 123}}
            userId="userId"
            room={{
                id: 123,
                roomName: "room name",
                description: "room description",
                phoneInfo: "room phone info"
            }}
            chatMessages={[
                {
                    chatMessageType: chatMessageType.ACTION,
                    userName: 'User Name',
                    timeStamp: '2016-12-08T14:57:10.222Z',
                    text: 'has joined the chat'
                },
                {
                    chatMessageType: chatMessageType.CHAT,
                    userName: 'User Name',
                    timeStamp: '2016-12-08T14:57:10.222Z',
                    text: 'Let\'s get it started!'
                },
                {
                    chatMessageType: chatMessageType.ACTION,
                    userName: 'Another User',
                    timeStamp: '2016-12-08T14:58:10.222Z',
                    text: 'has joined the chat.'
                },
                {
                    chatMessageType: chatMessageType.CHAT,
                    userName: 'New Guy',
                    timeStamp: '2016-12-08T14:58:10.222Z',
                    text: 'Hello.'
                },
                {
                    chatMessageType: chatMessageType.CHAT,
                    userName: 'User Name',
                    timeStamp: '2016-12-08T14:59:10.222Z',
                    text: 'Welcome, New Guy.'
                }
            ]}
            checklistItems={[
                {
                    sequenceNumber: 1,
                    status: checklistItemStatus.IN_PROGRESS,
                    description: "item description",
                    scheduledStartTime: '2016-12-08T14:00:00.222Z',
                    scheduledEndTime: '2016-12-08T15:00:00.222Z',
                    actualStartTime: '2016-12-08T14:03:00.222Z',
                    actualEndTime: null,
                    userName: 'Jabba Script'
                },
                {
                    sequenceNumber: 2,
                    status: checklistItemStatus.NOT_STARTED,
                    description: "itemdescription",
                    scheduledStartTime: '2016-12-08T14:00:00.222Z',
                    scheduledEndTime: '2016-12-08T15:00:00.222Z',
                    actualStartTime: null,
                    actualEndTime: null,
                    userName: 'Jabba Script',
                    chatMessages: [
                        { timeStamp: '2016-12-08T13:00:00.222Z', userName: 'Jabba Script', text: "I can't wait to start!" },
                        { timeStamp: '2016-12-08T13:01:00.222Z', userName: 'Sue Pervisor', text: "Hold your horses, big guy." }
                    ]
                }
            ]}
            actions={{
                joinChat: () => action('joinChat')
            }} />
        </div>
    ));
