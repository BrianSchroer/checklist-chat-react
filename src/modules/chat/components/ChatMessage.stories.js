import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {chatMessageType} from '../../chat';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import ChatMessage from './ChatMessage';

storiesOf('ChatMessage', module)
    .addDecorator(storybookFrameDecorator)

    .addWithInfo('chatMessageType.CHAT',
        'chat message with normal priority',
        () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.CHAT,
                userName: 'User Name',
                timeStamp: '2016-12-08T14:57:10.222Z',
                text: 'Good morning! Welcome to the chat!'
            }}
        />
    ))

    .addWithInfo('chatMessageType.CHAT high priority',
        'chat message with high priority for current user',
        () => (
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

    .addWithInfo('chatMessageType.CHAT long message',
        'Long chat message should wrap with the proper indent',
        () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.CHAT,
                userName: 'User Name',
                timeStamp: '2016-12-08T14:57:10.222Z',
                text: 'It\'s Tricky to rock a rhyme, to rock a rhyme that\'s right on time It\'s Tricky, it\'s Tricky (Tricky) Tricky (Tricky)'
            }}
        />
    ))

    .addWithInfo('chatMessageType.ACTION',
        'action message',
        () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.ACTION,
                userName: 'User Name',
                timeStamp: '2016-12-08T23:57:10.222Z',
                text: 'has joined the chat.'
            }}
        />
    ))

    .addWithInfo('chatMessageType.ACTION long message',
        'Long action message should wrap with the proper indentation',
        () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.ACTION,
                userName: 'User Name',
                timeStamp: '2016-12-08T23:57:10.222Z',
                text: 'has done something. Something very important that takes multiple lines of text to describe. Look how beautifully the seondary and tertiary lines wrap following the primary line! Italics remind me of the leaning tower of Pisa. Mmmmm... pizza...'
            }}
        />
    ));
