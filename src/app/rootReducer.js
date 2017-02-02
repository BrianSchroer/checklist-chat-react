import {combineReducers} from 'redux';
import {roomsReducer, roomIdReducer} from '../modules/room/roomDucks';
import {chatMessagesReducer, chatParticipantsReducer} from '../modules/chat/chatDucks';
import checklistItems from '../modules/checklist/checklistItemDucks';
import ajaxCallsInProgressCount from '../app/ajaxStatusDucks';
import modalDialogRequest from '../app/modalDialogDucks';
import initialState from './store/initialState';

const userId = (userId = initialState.userId, action) => userId;  // eslint-disable-line no-unused-vars

export const reducers = {
    userId,
    rooms: roomsReducer,
    roomId: roomIdReducer,
    chatMessages: chatMessagesReducer,
    chatParticipants: chatParticipantsReducer,
    checklistItems,
    ajaxCallsInProgressCount,
    modalDialogRequest
};

export default combineReducers(reducers);
