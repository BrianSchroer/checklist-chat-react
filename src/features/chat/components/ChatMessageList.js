import React, {PropTypes} from 'react';
import ChatMessage from './ChatMessage';

const ChatMessageList = ({messages}) => {
    return (
        <ul className="chat-message-list list-group">
            {messages.map(message =>
                <ChatMessage key={message.key} message={message}/>)}
        </ul>
    );
};

ChatMessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ChatMessageList;
