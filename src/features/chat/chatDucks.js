// Chat actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import { beginAjaxCall, ajaxCallError } from '../../app/ajaxStatus/ajaxStatusDucks';
import * as chatMessageType from './chatMessageType';

const prefix = 'checklist-chat/chat/';
export const LOAD_MESSAGES_SUCCESS = `${prefix}LOAD_MESSAGES_SUCCESS`;

// Actions:

export function loadMessagesSuccess(messages) {
    return { type: LOAD_MESSAGES_SUCCESS, messages };
}

export function loadMessages() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return loadFakeMessages().then(messages => {
            dispatch(loadMessagesSuccess(messages));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

function loadFakeMessages() {
    return new Promise((resolve) => {
        resolve([
            { key: 1, timeStamp: '2016-12-08 07:51', userName: 'Brian Schroer', chatMessageType: chatMessageType.ACTION, text: 'updated the room description / phone info.' },
            { key: 2, timeStamp: '2016-12-08 07:51', userName: 'Brian Schroer', chatMessageType: chatMessageType.ACTION, text: 'created new chat "Defect Fix Deployment".' },
            { key: 3, timeStamp: '2016-12-08 07:51', userName: 'Brian Schroer', chatMessageType: chatMessageType.ACTION, text: 'entered the room' },
            { key: 4, timeStamp: '2016-12-08 07:52', userName: 'Brian Schroer', chatMessageType: chatMessageType.CHAT, text: 'Hi, everybody! Welcome to the chat!' },
            { key: 5, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.ACTION, text: 'said that the world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced.' },
            { key: 6, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning.' },
            { key: 7, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning2.' },
            { key: 8, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning3.' },
            { key: 9, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning4.' },
            { key: 10, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning5.' },
            { key: 11, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced.' },
            { key: 12, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning7.' },
            { key: 13, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning8.' },
            { key: 14, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning9.' },
            { key: 15, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning10.' },
            { key: 16, timeStamp: '2016-12-08 07:53', userName: 'Gary Bortosky', chatMessageType: chatMessageType.CHAT, text: 'Good morning11.' }
        ]);
    });
}

// Reducers:

export default function reducer(messages = initialState.messages, action) {

    const actionType = action.type;

    switch (actionType) {

        case LOAD_MESSAGES_SUCCESS:
            return action.messages;

        default:
            return messages;
    }
}
