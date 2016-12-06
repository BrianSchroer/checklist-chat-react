import {combineReducers} from 'redux';
import ajaxCallsInProgressCount from '../app/ajaxStatus/ajaxStatusDuck';

const rootReducer = combineReducers({
    ajaxCallsInProgressCount
});

export default rootReducer;
