import {combineReducers} from 'redux';
import {roomsReducer, roomIdReducer} from '../features/room/roomDucks';
import {chatMessagesReducer, chatParticipantsReducer} from '../features/chat/chatDucks';
import {checklistItemsReducer, checklistItemSequenceNumberReducer} from '../features/checklist/checklistItemDucks';
import ajaxCallsInProgressCount from '../app/ajaxStatusDucks';
import modalDialogRequest from '../app/modalDialogDucks';
import initialState from './store/initialState';

const userIdReducer = (userId = initialState.userId, action) => userId;  // eslint-disable-line no-unused-vars

const rootReducer = combineReducers({
    userId: userIdReducer,
    rooms: roomsReducer,
    roomId: roomIdReducer,
    chatMessages: chatMessagesReducer,
    chatParticipants: chatParticipantsReducer,
    checklistItems: checklistItemsReducer,
    checklistItemSequenceNumber: checklistItemSequenceNumberReducer,
    ajaxCallsInProgressCount,
    modalDialogRequest
});

export default rootReducer;
