import expect from 'expect';
import deepFreeze from 'deep-freeze';
import reducer, * as chatMessageDucks from './chatMessageDucks';

const originalChatMessages = [];
deepFreeze(originalChatMessages);

describe('chatMessageDucks.reducer', () => {
    it('should return expected value for LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS', () => {
        const chatMessages = [ {id: 1}, {id: 2} ];
        const action = { type: chatMessageDucks.LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS, chatMessages };

        expect(reducer(originalChatMessages, action)).toEqual(chatMessages);
    });

    [ 'unexpected action type', undefined ].forEach(actionType => {
        it(`should return original value for unexpected action type "${actionType}"`, () => {
            expect(reducer(originalChatMessages, {type: actionType})).toEqual(originalChatMessages);
        });
    });
});
