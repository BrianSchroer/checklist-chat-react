import {combineReducers} from 'redux';
import ajaxCallsInProgressCount from '../app/ajaxStatusDucks';
import modalDialog from '../app/modalDialogDucks';
import rooms from '../features/room/roomDucks';
import roomId from '../features/room/roomIdDucks';
import roomInfo from '../features/room/roomInfoDucks';
import chatMessages from '../features/chat/chatMessageDucks';
import checklistItems from '../features/checklist/checklistItemDucks';

const rootReducer = combineReducers({
    ajaxCallsInProgressCount,
    modalDialog,
    rooms,
    roomId,
    roomInfo,
    chatMessages,
    checklistItems
});

export default rootReducer;
