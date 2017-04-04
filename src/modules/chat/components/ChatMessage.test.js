import React from 'react';
import {snapshotHelper} from '../../../util/testHelpers';
import ChatMessage from './ChatMessage';
import {chatMessageType} from '../../chat';

const testMessage = {
    timeStamp: '2016-12-08T14:57:10.222Z',
    userName: 'test userName',
    text: 'test text'
};

function overrideMessage(messageOverrides) {
    return {
        userId: 'currentUser',
        chatMessage: Object.assign({}, testMessage, messageOverrides)
    };
}

function assertSnapshotMatch(messageOverrides) {
    snapshotHelper.assertMatch(<ChatMessage {...overrideMessage(messageOverrides)}/>);
}

describe('ChatMessage', () => {
    describe(`when chatMessageType = "${chatMessageType.ACTION}"`, () => {
        it('should render correctly', () => {
            assertSnapshotMatch({chatMessageType: chatMessageType.ACTION});
        });
    });

    describe(`when chatMessageType = "${chatMessageType.CHAT}"`, () => {
        it('should render correctly', () => {
            assertSnapshotMatch({chatMessageType: chatMessageType.CHAT});
        });

        it('should render priority notification for current recipient with "high-priority" class', () => {
            assertSnapshotMatch({
                chatMessageType: chatMessageType.CHAT,
                priorityNotificationRecipients: ['currentUser', 'anotherUser']
            });
        });

        it('should render priority notification for other recipients without "high-priority" class', () => {
            assertSnapshotMatch({
                chatMessageType: chatMessageType.CHAT,
                priorityNotificationRecipients: ['anotherUser', 'yetAnotherUser']
            });
        });
    });
});
