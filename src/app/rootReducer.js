import {combineReducers} from 'redux';
import {roomsReducer, roomIdReducer, roomInfoReducer} from '../features/room/roomDucks';
import chatMessages from '../features/chat/chatMessageDucks';
import {checklistItemsReducer, checklistItemSequenceNumberReducer} from '../features/checklist/checklistItemDucks';
import ajaxCallsInProgressCount from '../app/ajaxStatusDucks';
import modalDialogRequest from '../app/modalDialogDucks';

const rootReducer = combineReducers({
    rooms: roomsReducer,
    roomId: roomIdReducer,
    roomInfo: roomInfoReducer,
    chatMessages,
    checklistItems: checklistItemsReducer,
    checklistItemSequenceNumber: checklistItemSequenceNumberReducer,
    ajaxCallsInProgressCount,
    modalDialogRequest
});

export default rootReducer;
