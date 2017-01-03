// AJAX status actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from './store/initialState';

const prefix = 'checklist-chat/ajaxStatus/';
const BEGIN_AJAX_CALL = `${prefix}BEGIN_AJAX_CALL`;
const AJAX_CALL_ERROR = `${prefix}AJAX_CALL_ERROR`;

// Action creators:
export const beginAjaxCall = () => ({type: BEGIN_AJAX_CALL});

export const ajaxCallError = () => ({type: AJAX_CALL_ERROR});

// Reducers:

export default function reducer(
    ajaxCallsInProgressCount = initialState.ajaxCallsInProgressCount,
    action) {

    const actionType = action.type;
    let count = ajaxCallsInProgressCount;

    switch (actionType) {

        case BEGIN_AJAX_CALL:
            count++;
            break;

        case AJAX_CALL_ERROR:
            count--;
            break;

        default:
            if (actionType.substring(actionType.length - 8) == '_SUCCESS') {
                // (author & course reducers issue "_SUCCESS" actions):
                count--;
            }
            break;
    }

    return count;
}
