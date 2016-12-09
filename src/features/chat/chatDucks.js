// Chat actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import { beginAjaxCall, ajaxCallError } from '../../app/ajaxStatus/ajaxStatusDucks';

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
            { key: 1, timeStamp: '2016-12-08 15:05', userName: 'Brian Schroer', text: 'Hi, everybody!' },
            { key: 2, timeStamp: '2016-12-08 15:06', userName: 'Gary Bortosky', text: 'This should be fun.' }
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
