// Current room info actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatusDucks';
import {getRoomInfo} from '../../api/chatApi';

const prefix = 'checklist-chat/roomInfo/';
const SET_ROOM_INFO_SUCCESS = `${prefix}SET_ROOM_INFO_SUCCESS`;

// Action creators:

export function setRoomInfoSuccess(roomInfo) {
    return {type: SET_ROOM_INFO_SUCCESS, roomInfo};
}

export function setRoomInfo(roomId) {
    if (roomId) {
        return dispatch => {
            dispatch(beginAjaxCall());
            return getRoomInfo(roomId).then(roomInfo => {
                dispatch(setRoomInfoSuccess(roomInfo));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
        };
    } else {
        return null;
    }
}

// Reducers:

export default function reducer(roomInfo = initialState.roomInfo, action) {
    const actionType = action.type;

    switch (actionType) {

        case SET_ROOM_INFO_SUCCESS:
            return action.roomInfo;

        default:
            return roomInfo;
    }
}
