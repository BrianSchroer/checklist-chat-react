import {combineReducers} from 'redux';
import ajaxCallsInProgressCount from '../app/ajaxStatus/ajaxStatusDucks';
import messages from '../features/chat/chatDucks';

const rootReducer = combineReducers({
    ajaxCallsInProgressCount,
    messages
});

export default rootReducer;
