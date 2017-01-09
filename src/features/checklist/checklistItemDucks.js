// Checklist item actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatusDucks';
import * as mockJsonDbApi from '../../api/mockJsonDbApi';

const prefix = 'checklist-chat/checklist-item/';
const LOAD_CHECKLIST_ITEMS_FOR_ROOM_SUCCESS = `${prefix}LOAD_CHECKLIST_ITEMS_FOR_ROOM_SUCCESS`;
const SET_SEQUENCE_NUMBER_SUCCESS = `${prefix}SET_SEQUENCE_NUMBER_SUCCESS`;

// Actions:
export const loadChecklistItemsForRoomSuccess =
    (checklistItems) => ({type: LOAD_CHECKLIST_ITEMS_FOR_ROOM_SUCCESS, checklistItems});

export const setSequenceNumberSuccess =
    (sequenceNumber) => ({type: SET_SEQUENCE_NUMBER_SUCCESS, sequenceNumber});

export function loadChecklistItemsForRoom(roomId) {
    if (roomId) {
        return dispatch => {
            dispatch(beginAjaxCall());

            return mockJsonDbApi.getChecklistItems(roomId).then(checklistItems => {
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

export function saveChecklistItem(checklistItem, roomId, userId) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return mockJsonDbApi.saveChecklistItem(checklistItem, roomId, userId).then(() =>
        {
            mockJsonDbApi.getChecklistItems(checklistItem.roomId).then(items => {
                dispatch(loadChecklistItemsForRoomSuccess(items));
            });
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function setChecklistItemSequenceNumber(sequenceNumber) {
    return setSequenceNumberSuccess(sequenceNumber);
}

// Reducers:

export function checklistItemsReducer(checklistItems = initialState.checklistItems, action) {

    const actionType = action.type;

    switch (actionType) {

        case LOAD_CHECKLIST_ITEMS_FOR_ROOM_SUCCESS:
            return action.checklistItems;

        default:
            return checklistItems;
    }
}

export function checklistItemSequenceNumberReducer(
        sequenceNumber = initialState.checklistItemSequenceNumber, action) {

    const actionType = action.type;

    switch (actionType) {

        case SET_SEQUENCE_NUMBER_SUCCESS:
            return action.sequenceNumber;

        default:
            return sequenceNumber;
    }
}
