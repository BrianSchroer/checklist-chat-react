import React, {PropTypes} from 'react';
import format from '../../../util/format';
import ChatMessage from './ChatMessage';

const ChatMessageListItem = ({chatMessage}) => {
    return <li><ChatMessage chatMessage={chatMessage}/></li>;
};

ChatMessageListItem.propTypes = {
    chatMessage: PropTypes.object.isRequired
};

export default ChatMessageListItem;
