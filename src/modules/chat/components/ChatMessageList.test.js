import React from 'react';
import {snapshotHelper} from '../../../util/testHelpers';
import ChatMessageList from './ChatMessageList';
import {chatMessageType} from '../../chat';

describe('ChatMessageList', () => {
    it('should render correctly', () => {
        const props = {
            userId: 'test user id',
            chatMessages: [
                { id: 1, timeStamp: '2016-12-08T14:57:11.222Z', userName: 'user1', text: 'text1', chatMessageType: chatMessageType.CHAT },
                { id: 2, timeStamp: '2016-12-08T14:57:12.222Z', userName: 'user2', text: 'text2', chatMessageType: chatMessageType.ACTION },
                { id: 3, timeStamp: '2016-12-08T14:57:13.222Z', userName: 'user3', text: 'text3', chatMessageType: chatMessageType.CHAT }
            ]
        };

        snapshotHelper.assertMatch(<ChatMessageList {...props} />);
    });
});
