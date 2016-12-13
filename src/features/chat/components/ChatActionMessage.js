import React, {PropTypes} from 'react';
import TimeStamp from '../../../components/TimeStamp';

const ChatMessage = ({message}) => {
    return (
        <li className="chat-action-message">
            <div className="chat-message-timestamp">
                <TimeStamp timeStamp={message.timeStamp} />
            </div>
            <span className="chat-action-message-text">{message.userName} {message.text}</span>
        </li>
    );
};

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;
