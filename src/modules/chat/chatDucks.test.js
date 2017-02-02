import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {chatMessageType} from '../chat';
import * as chatDucks from './chatDucks';

describe('chatMessagesReducer', () => {

    const originalChatMessages = [
        { id: 1, chatMessageType: chatMessageType.CHAT },
        { id: 2, chatMessageType: chatMessageType.ACTION }
    ];
    deepFreeze(originalChatMessages);

    const reducer = chatDucks.chatMessagesReducer;

    it(`should return expected value for ${chatDucks.LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS}`, () => {
        const chatMessages = [ {id: 1}, {id: 2} ];
        const action = { type: chatDucks.LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS, chatMessages };

        expect(reducer(originalChatMessages, action)).toEqual(chatMessages);
    });

    it(`should return expected value for ${chatDucks.DISPLAY_CHAT_MESSAGE}`, () => {
        const newMessage = {id: 333, chatMessageType: chatMessageType.CHAT};
        const action = {type: chatDucks.DISPLAY_CHAT_MESSAGE, chatMessage: newMessage};

        const updatedMessages = reducer(originalChatMessages, action);
        const updatedCount = updatedMessages.length;

        expect(updatedCount).toEqual(originalChatMessages.length + 1);
        expect(updatedMessages[updatedCount - 1]).toEqual(newMessage);
    });

    it(`should return expected value for ${chatDucks.DISPLAY_CHAT_USER_ACTION}`, () => {
        const newMessage = {id: 444, chatMessageType: chatMessageType.ACTION};
        const action = {type: chatDucks.DISPLAY_CHAT_USER_ACTION, chatMessage: newMessage};

        const updatedMessages = reducer(originalChatMessages, action);
        const updatedCount = updatedMessages.length;

        expect(updatedCount).toEqual(originalChatMessages.length + 1);
        expect(updatedMessages[updatedCount - 1]).toEqual(newMessage);
    });

    [ 'unexpected action type', undefined ].forEach(actionType => {
        it(`should return original value for unexpected action type "${actionType}"`, () => {
            expect(reducer(originalChatMessages, {type: actionType})).toEqual(originalChatMessages);
        });
    });
});
