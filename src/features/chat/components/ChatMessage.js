import React, {PropTypes} from 'react';
import TimeStamp from '../../../components/TimeStamp';

const ChatMessage = ({message}) => {
    return (
        <li className="chat-message">
            <div className="chat-message-timestamp">
                <TimeStamp timeStamp={message.timeStamp} />
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
