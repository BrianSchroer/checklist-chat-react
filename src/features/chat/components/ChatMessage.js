import React, {PropTypes} from 'react';
import format from '../../../util/format';
import * as chatMessageType from '../chatMessageType';

const ChatMessage = ({chatMessage}) => {
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
                <div className="chat-message">
                    <div className="timestamp chat-message-timestamp">
                        {format.time(chatMessage.timeStamp)}
                    </div>
                    <strong>{`${chatMessage.userName}: `}</strong>
                    <span className="chat-message-text">{chatMessage.text}</span>
                </div>
            );
    }
};

ChatMessage.propTypes = {
    chatMessage: PropTypes.object.isRequired
};

export default ChatMessage;
