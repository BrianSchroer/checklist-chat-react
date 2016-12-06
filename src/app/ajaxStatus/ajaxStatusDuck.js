// AJAX status actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';

export const BEGIN_AJAX_CALL = 'pluralsight-redux-starter/ajaxStatus/BEGIN_AJAX_CALL';
export const AJAX_CALL_ERROR = 'pluralsight-redux-starter/ajaxStatus/AJAX_CALL_ERROR';

// Action creators:

export function beginAjaxCall() {
    return {type: BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
    return {type: AJAX_CALL_ERROR};
}

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
