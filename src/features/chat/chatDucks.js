// Chat actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatusDucks';
import * as mockJsonDbApi from '../../api/mockJsonDbApi';

const prefix = 'checklist-chat/chat/';
export const LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS = `${prefix}LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS`;
export const LOADED_CHAT_PARTICIPANTS_FOR_ROOM = `${prefix}LOADED_CHAT_PARTICIPANTS_FOR_ROOM`;

// Actions:

export const loadChatMessagesForRoomSuccess =
    (chatMessages) => ({type: LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS, chatMessages});

export const loadedChatParticipantsForRoom =
    (chatParticipants) => ({type: LOADED_CHAT_PARTICIPANTS_FOR_ROOM, chatParticipants});

const updateMessagesAndParticipants = (chatMessages, dispatch) => {
    dispatch(loadChatMessagesForRoomSuccess(chatMessages));

    const sortedNames = chatMessages.map(m => m.userName).sort();
    const uniqueNames = [...new Set(sortedNames)];

    const chatParticipants = uniqueNames.map(userName => ({
        id: userName,
        name: userName,
        department: 'Department',
        title: 'Title',
        connection: 'Connection'
    }));

    dispatch(loadedChatParticipantsForRoom(chatParticipants));
};

export function loadChatMessagesForRoom(roomId) {
    if (roomId) {
        return dispatch => {
            dispatch(beginAjaxCall());

            return mockJsonDbApi.getChatMessages(roomId).then(chatMessages =>
                updateMessagesAndParticipants(chatMessages, dispatch)
            ).catch(error => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
        };
    } else {
        return [];
    }
}

export function saveChatMessage(chatMessage, roomId, userId) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return mockJsonDbApi.chat(chatMessage, roomId, userId).then(() =>
        {
            mockJsonDbApi.getChatMessages(roomId).then(chatMessages =>
                updateMessagesAndParticipants(chatMessages, dispatch));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

// Reducers:

export function chatMessagesReducer(chatMessages = initialState.chatMessages, action) {
    const actionType = action.type;

    switch (actionType) {

        case LOAD_CHAT_MESSAGES_FOR_ROOM_SUCCESS:
            return action.chatMessages;

        default:
            return chatMessages;
    }
}

export function chatParticipantsReducer(chatParticipants = initialState.chatParticipants, action) {
    const actionType = action.type;

    switch (actionType) {

        case LOADED_CHAT_PARTICIPANTS_FOR_ROOM:
            return action.chatParticipants;

        default:
            return chatParticipants;
    }
}
