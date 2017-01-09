import {combineReducers} from 'redux';
import {roomsReducer, roomIdReducer, roomInfoReducer} from '../features/room/roomDucks';
import {chatMessagesReducer, chatParticipantsReducer} from '../features/chat/chatDucks';
import {checklistItemsReducer, checklistItemSequenceNumberReducer} from '../features/checklist/checklistItemDucks';
import ajaxCallsInProgressCount from '../app/ajaxStatusDucks';
import modalDialogRequest from '../app/modalDialogDucks';

const rootReducer = combineReducers({
    rooms: roomsReducer,
    roomId: roomIdReducer,
    roomInfo: roomInfoReducer,
    chatMessages: chatMessagesReducer,
    chatParticipants: chatParticipantsReducer,
    checklistItems: checklistItemsReducer,
    checklistItemSequenceNumber: checklistItemSequenceNumberReducer,
    ajaxCallsInProgressCount,
    modalDialogRequest
});

export default rootReducer;
