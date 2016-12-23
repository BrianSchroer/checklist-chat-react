// Room actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatusDucks';
import {getRooms, saveRoom} from '../../api/chatApi';

const prefix = 'checklist-chat/room/';
export const SAVE_ROOM_SUCCESS = `${prefix}SAVE_ROOM_SUCCESS`;
export const LOAD_ROOMS_SUCCESS = `${prefix}LOAD_ROOMS_SUCCESS`;
export const UPDATE_ROOM_SUCCESS = `${prefix}UPDATE_ROOM_SUCCESS`;

// Actions:

export function loadRoomsSuccess(rooms) {
    return {type: LOAD_ROOMS_SUCCESS, rooms};
}

export function saveRoomSuccess(rooms) {
    return {type: SAVE_ROOM_SUCCESS, rooms};
}

export function loadRooms() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return getRooms().then(rooms => {
            dispatch(loadRoomsSuccess(rooms));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function saveRoomInfo(roomInfo) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return saveRoom(roomInfo).then(room =>
        {
            dispatch(saveRoomSuccess(room));
            getRooms().then(rooms => {
                dispatch(loadRoomsSuccess(rooms));
            });
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

// Reducers:

export default function reducer(rooms = initialState.rooms, action) {

    const actionType = action.type;

    switch (actionType) {

        case LOAD_ROOMS_SUCCESS:
            return action.rooms;

        default:
            return rooms;
    }
}
