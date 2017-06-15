import React from 'react';
import PropTypes from 'prop-types';
import {format} from '../../../util';
import {Markdown} from '../../core';
import {chatMessageType} from '../../chat';

const withPriorityClass = (className, chatMessage, userId) => {
    let priorityClass = className;

    if (userId) {
        const {priorityNotificationRecipients} = chatMessage;
        if (priorityNotificationRecipients && priorityNotificationRecipients.includes(userId)) {
            priorityClass += ' high-priority';
        }
    }

    return priorityClass;
};

const ChatMessage = ({chatMessage, userId}) => {
    switch (chatMessage.chatMessageType) {
        case chatMessageType.ACTION:
            return (
                <div className="chat-action-message text-muted">
                    <div className="timestamp chat-message-timestamp">
                        {format.time(chatMessage.timeStamp)}
                    </div>
                    <span className="chat-action-message-text">{`${chatMessage.userName} ${chatMessage.text}`}</span>
                </div>
            );

        case chatMessageType.CHAT:
        default:
            return (
                <div className={withPriorityClass('chat-message', chatMessage, userId)}>
                    <div className="timestamp chat-message-timestamp">
                        {format.time(chatMessage.timeStamp)}
                    </div>
                    <strong>{`${chatMessage.userName}: `}</strong>
                    <Markdown source={chatMessage.text} className="chat-message-text" />
                </div>
            );
    }
};

ChatMessage.propTypes = {
    chatMessage: PropTypes.object.isRequired,
    userId: PropTypes.string
};

export default ChatMessage;
