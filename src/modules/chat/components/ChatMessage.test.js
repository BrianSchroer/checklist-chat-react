import React from 'react';
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import ChatMessage from './ChatMessage';
import { chatMessageType } from '../../chat';

function propsAdjuster(props, chatMessageOverrides) {
  return {
    userId: props.userId,
    chatMessage: Object.assign({}, props.chatMessage, chatMessageOverrides)
  };
}

describe('ChatMessage', () => {
  const snapshotHelper = new SnapshotHelper(
    (
      <ChatMessage
        userId="currentUser"
        chatMessage={{
          timeStamp: '2016-12-08T14:57:10.222Z',
          userName: 'test userName',
          text: 'test text'
        }}
      />
    )
  ).withPropsAdjuster(propsAdjuster);

  describe(`when chatMessageType = "${chatMessageType.ACTION}"`, () => {
    it('should render correctly', () => {
      snapshotHelper.test({ chatMessageType: chatMessageType.ACTION });
    });
  });

  describe(`when chatMessageType = "${chatMessageType.CHAT}"`, () => {
    it('should render correctly', () => {
      snapshotHelper.test({ chatMessageType: chatMessageType.CHAT });
    });

    it('should render priority notification for current recipient with "high-priority" class', () => {
      snapshotHelper.test({
        chatMessageType: chatMessageType.CHAT,
        priorityNotificationRecipients: ['currentUser', 'anotherUser']
      });
    });

    it('should render priority notification for other recipients without "high-priority" class', () => {
      snapshotHelper.test({
        chatMessageType: chatMessageType.CHAT,
        priorityNotificationRecipients: ['anotherUser', 'yetAnotherUser']
      });
    });
  });
});
