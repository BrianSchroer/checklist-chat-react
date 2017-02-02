import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {chatMessageType} from '../../chat';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';
import ChatMessage from './ChatMessage';

storiesOf('ChatMessage', module)
    .addDecorator(storyFrameDecorator)

    .add('chatMessageType.CHAT', () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.CHAT,
                userName: 'User Name',
                timeStamp: '2016-12-08T14:57:10.222Z',
                text: 'Good morning! Welcome to the chat!'
            }}
        />
    ))

    .add('chatMessageType.CHAT high priority', () => (
        <ChatMessage
            userId="currentUser"
            chatMessage={{
                chatMessageType: chatMessageType.CHAT,
                userName: 'Sue Pervisor',
                timeStamp: '2016-12-08T14:57:10.222Z',
                text: 'Grow up, people! *@#$% profanity will not be tolerated!',
                priorityNotificationRecipients: ['currentUser', 'anotherUser']
            }}
        />
    ))

    .add('chatMessageType.CHAT long message', () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.CHAT,
                userName: 'User Name',
                timeStamp: '2016-12-08T14:57:10.222Z',
                text: 'It\'s Tricky to rock a rhyme, to rock a rhyme that\'s right on time It\'s Tricky, it\'s Tricky (Tricky) Tricky (Tricky)'
            }}
        />
    ))

    .add('chatMessageType.ACTION', () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.ACTION,
                userName: 'User Name',
                timeStamp: '2016-12-08T23:57:10.222Z',
                text: 'has joined the chat.'
            }}
        />
    ))

    .add('chatMessageType.ACTION long message', () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.ACTION,
                userName: 'User Name',
                timeStamp: '2016-12-08T23:57:10.222Z',
                text: 'has done something. Something very important that takes multiple lines of text to describe. Look how beautifully the seondary and tertiary lines wrap following the primary line! Italics remind me of the leaning tower of Pisa. Mmmmm... pizza...'
            }}
        />
    ));
