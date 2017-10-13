import React from 'react';
import PropTypes from 'prop-types';
import { uiHelper } from '../../../util';
import ChatMessage from './ChatMessage';

class ChatMessageList extends React.Component {
  componentDidUpdate() {
    if (this.props.shouldScrollToBottom) {
      uiHelper.afterRenderIsComplete(() => {
        uiHelper.scrollToBottom(this.messageList);
      });
    }
  }

  render() {
    const { userId, chatMessages } = this.props;

    return (
      <ul
        className="chat-message-list list-unstyled"
        ref={ul => (this.messageList = ul)} //eslint-disable-line react/jsx-no-bind
      >
        {chatMessages.map(message => (
          <li key={message.id}>
            <ChatMessage userId={userId} chatMessage={message} />
          </li>
        ))}
      </ul>
    );
  }
}

ChatMessageList.propTypes = {
  userId: PropTypes.string.isRequired,
  chatMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
  shouldScrollToBottom: PropTypes.bool
};

ChatMessageList.defaultProps = {
  shouldScrollToBottom: false
};

export default ChatMessageList;
