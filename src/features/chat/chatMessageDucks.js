// Chat actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatusDucks';
import {getChatMessages} from '../../api/chatApi';

const prefix = 'checklist-chat/chat/';
export const LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS = `${prefix}LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS`;

// Actions:

export const loadChatMessagesForRoomSuccess =
    (chatMessages) => ({type: LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS, chatMessages});

export function loadChatMessagesForRoom(roomId) {
    if (roomId) {
        return dispatch => {
            dispatch(beginAjaxCall());

            return getChatMessages(roomId).then(chatMessages => {
                dispatch(loadChatMessagesForRoomSuccess(chatMessages));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
        };
    } else {
        return [];
    }
}

// Reducers:

export default function reducer(chatMessages = initialState.chatMessages, action) {

    const actionType = action.type;

    switch (actionType) {

        case LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS:
            return action.chatMessages;

        default:
            return chatMessages;
    }
}
