import React, {PropTypes} from 'react';
import ChatMessage from './ChatMessage';
import ChatActionMessage from './ChatActionMessage';
import * as chatMessageType from '../chatMessageType';

const ChatMessageList = ({messages}) => {
    return (
        <ul className="chat-message-list list-unstyled">
            {messages.map(message =>
                (message.chatMessageType === chatMessageType.ACTION)
                    ? <ChatActionMessage key={message.key} message={message}/>
                    : <ChatMessage key={message.key} message={message}/>
            )}
        </ul>
    );
};

ChatMessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ChatMessageList;
