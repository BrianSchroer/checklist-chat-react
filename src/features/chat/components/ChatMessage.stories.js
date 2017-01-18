import React from 'react';
import { storiesOf } from '@kadira/storybook';
import * as chatMessageType from '../chatMessageType';
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

    .add('chatMessageType.ACTION', () => (
        <ChatMessage
            chatMessage={{
                chatMessageType: chatMessageType.ACTION,
                userName: 'User Name',
                timeStamp: '2016-12-08T23:57:10.222Z',
                text: 'has joined the chat.'
            }}
            />
    ));
