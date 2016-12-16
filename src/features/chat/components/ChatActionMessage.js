import React, {PropTypes} from 'react';
import format from '../../../util/format';

const ChatMessage = ({message}) => {
    return (
        <li className="chat-action-message">
            <div className="timestamp chat-message-timestamp">
                {format.time(message.timeStamp)}
            </div>
            <span className="chat-action-message-text">{`${message.userName} ${message.text}`}</span>
        </li>
    );
};

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;
