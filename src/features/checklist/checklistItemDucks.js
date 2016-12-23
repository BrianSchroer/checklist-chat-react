// Checklist item actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatusDucks';
import {getChecklistItems} from '../../api/chatApi';

const prefix = 'checklist-chat/checklist-item/';
export const LOAD_CHECKLIST_ITEMS_FOR_ROOM_SUCCESS = `${prefix}LOAD_CHECKLIST_ITEMS_FOR_ROOM_SUCCESS`;
export const SAVE_CHECKLIST_ITEM_SUCCESS = `${prefix}SAVE_CHECKLIST_ITEM_SUCCESS`;

// Actions:
export function loadChecklistItemsForRoomSuccess(checklistItems) {
    return { type: LOAD_CHECKLIST_ITEMS_FOR_ROOM_SUCCESS, checklistItems };
}

export function saveChecklistItemSuccess(checklistItem) {
    return {type: SAVE_CHECKLIST_ITEM_SUCCESS, checklistItem};
}

export function loadChecklistItemsForRoom(roomId) {
    if (roomId) {
        return dispatch => {
            dispatch(beginAjaxCall());

            return getChecklistItems(roomId).then(checklistItems => {
                dispatch(loadChecklistItemsForRoomSuccess(checklistItems));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
        };
    } else {
        return [];
    }
}

export function saveChecklistItem(checklistItem) {  // eslint-disable-line no-unused-vars
}
// Reducers:

export default function reducer(checklistItems = initialState.checklistItems, action) {

    const actionType = action.type;

    switch (actionType) {

        case LOAD_CHECKLIST_ITEMS_FOR_ROOM_SUCCESS:
            return action.checklistItems;

        default:
            return checklistItems;
    }
}