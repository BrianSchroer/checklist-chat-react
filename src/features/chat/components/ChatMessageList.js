import React, {PropTypes} from 'react';
import ChatMessageListItem from './ChatMessageListItem';

const ChatMessageList = ({chatMessages}) => {
    return (
        <ul className="chat-message-list list-unstyled">
            {chatMessages.map(message =>
                <ChatMessageListItem key={message.id} chatMessage={message}/>
            )}
        </ul>
    );
};

ChatMessageList.propTypes = {
    chatMessages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ChatMessageList;
