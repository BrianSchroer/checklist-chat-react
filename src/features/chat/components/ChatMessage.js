import React, {PropTypes} from 'react';
import format from '../../../util/format';

const ChatMessage = ({message}) => {
    return (
        <li className="chat-message">
            <div className="timestamp chat-message-timestamp">
                {format.time(message.timeStamp)}
            </div>
            <strong>{`${message.userName}: `}</strong>
            <span className="chat-message-text">{message.text}</span>
        </li>
    );
};

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;
