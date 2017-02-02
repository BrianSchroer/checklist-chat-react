import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import enzymeHelper from '../../../util/enzymeHelper';
import ChatMessage from './ChatMessage';
import {chatMessageType} from '../../chat';
import format from '../../../util/format';

const testMessage = {
    timeStamp: '2016-12-08T14:57:10.222Z',
    userName: 'test userName',
    text: 'test text'
};

function render(messageOverrides) {
    const props = {
        userId: 'currentUser',
        chatMessage: Object.assign({}, testMessage, messageOverrides)
    };

    return shallow(<ChatMessage {...props}/>);
}

describe('ChatMessage', () => {
    describe(`when chatMessageType = "${chatMessageType.ACTION}"`, () => {
        it('should render message.timeStamp', () =>{
            const elem = enzymeHelper.findSingle(render({chatMessageType: chatMessageType.ACTION}),
                'div.chat-action-message > div.chat-message-timestamp');
            expect(elem.text()).toEqual(format.time(testMessage.timeStamp));
        });

        it('should render message.userName and message.text', () => {
            const elem = enzymeHelper.findSingle(render({chatMessageType: chatMessageType.ACTION}),
                'div.chat-action-message > span.chat-action-message-text');
            expect(elem.text()).toBe(`${testMessage.userName} ${testMessage.text}`);
        });
    });

    describe(`when chatMessageType = "${chatMessageType.CHAT}"`, () => {
        it('should render message.timeStamp', () => {
            const elem = enzymeHelper.findSingle(render({chatMessageType: chatMessageType.CHAT}),
                'div.chat-message > div.chat-message-timestamp');
            expect(elem.text()).toEqual(format.time(testMessage.timeStamp));
        });

        it('should render message.userName', () => {
            const elem = enzymeHelper.findSingle(render({chatMessageType: chatMessageType.CHAT}),
                'div.chat-message > strong');
            expect(elem.text()).toBe(testMessage.userName+ ': ');
        });

        it('should render message.text', () => {
            const elem = enzymeHelper.findSingle(render({chatMessageType: chatMessageType.CHAT}),
                'div.chat-message > span.chat-message-text');
            expect(elem.text()).toBe(testMessage.text);
        });

        it('should style high priority messages as expected', () => {
            const div = enzymeHelper.findSingle(
                render({
                    chatMessageType: chatMessageType.CHAT,
                    priorityNotificationRecipients: ['currentUser', 'anotherUser']
                }),
                'div.chat-message');

            expect(div.hasClass('high-priority')).toBe(true);
        });

        it('should style normal priority messages as expected', () => {
            const div = enzymeHelper.findSingle(
                render({
                    chatMessageType: chatMessageType.CHAT,
                    priorityNotificationRecipients: ['anotherUser', 'yetAnotherUser']
                }),
                'div.chat-message');

            expect(div.hasClass('high-priority')).toBe(false);
        });
    });
});
