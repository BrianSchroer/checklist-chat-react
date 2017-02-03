import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {chatMessageType} from '../../chat';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import ChatMessageList from './ChatMessageList';

storiesOf('ChatMessageList', module)
    .addDecorator(storybookFrameDecorator)

    .add('ChatMessageList', () => (
        <ChatMessageList
            userId="currentUser"
            chatMessages={[
                {
                    chatMessageType: chatMessageType.ACTION,
                    userName: 'User Name',
                    timeStamp: '2016-12-08T14:57:10.222Z',
                    text: 'has joined the chat'
                },
                {
                    chatMessageType: chatMessageType.CHAT,
                    userName: 'Sue Pervisor',
                    timeStamp: '2016-12-08T14:57:10.222Z',
                    text: 'Grow up, people! *@#$% profanity will not be tolerated!',
                    priorityNotificationRecipients: ['currentUser', 'anotherUser']
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
            />
    ));
