import React, {PropTypes} from 'react';
import TimeStamp from '../../../components/TimeStamp';

const ChatMessage = ({message}) => {
    return (
        <li className="list-group-item">
            <div className="chat-message-timestamp">
                <TimeStamp timeStamp={message.timeStamp} />
            </div>
            <strong>{message.userName}:</strong>
            <div className="chat-message-text">{message.text}</div>
        </li>
    );
};

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;
