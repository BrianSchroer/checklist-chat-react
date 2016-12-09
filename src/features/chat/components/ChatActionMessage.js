import React, {PropTypes} from 'react';
import TimeStamp from '../../../components/TimeStamp';

const ChatMessage = ({message}) => {
    return (
        <li className="list-group-item">
            <div className="chat-message-timestamp">
                <TimeStamp timeStamp={message.timeStamp} />
            </div>
            <div className="chat-action-message-text">{message.userName} {message.text}</div>
        </li>
    );
};

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;
