import React, {PropTypes} from 'react';
import ChatMessage from './ChatMessage';

const ChatMessageList = ({chatMessages}) => {
    return (
        <ul id="chatMessageList" className="chat-message-list list-unstyled">
            {chatMessages.map(message =>
                <li key={message.id}><ChatMessage chatMessage={message}/></li>
            )}
        </ul>
    );
};

ChatMessageList.propTypes = {
    chatMessages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ChatMessageList;
