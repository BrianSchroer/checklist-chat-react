import {combineReducers} from 'redux';
import ajaxCallsInProgressCount from '../app/ajaxStatus/ajaxStatusDucks';
import rooms from '../features/room/roomDucks';
import messages from '../features/chat/chatDucks';

const rootReducer = combineReducers({
    ajaxCallsInProgressCount,
    rooms,
    messages
});

export default rootReducer;
