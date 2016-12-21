import {combineReducers} from 'redux';
import ajaxCallsInProgressCount from '../app/ajaxStatusDucks';
import currentRoomId from '../app/currentRoomIdDucks';
import modalDialog from '../app/modalDialogDucks';
import rooms from '../features/room/roomDucks';
import messages from '../features/chat/chatDucks';

const rootReducer = combineReducers({
    ajaxCallsInProgressCount,
    modalDialog,
    currentRoomId,
    rooms,
    messages
});

export default rootReducer;
