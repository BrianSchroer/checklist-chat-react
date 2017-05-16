import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';

const ChatMessageList = ({userId, chatMessages}) => {
    return (
        <ul id="chatMessageList" className="chat-message-list list-unstyled">
            {chatMessages.map(message =>
                <li key={message.id}><ChatMessage userId={userId} chatMessage={message}/></li>
            )}
        </ul>
    );
};

ChatMessageList.propTypes = {
    userId: PropTypes.string.isRequired,
    chatMessages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ChatMessageList;
