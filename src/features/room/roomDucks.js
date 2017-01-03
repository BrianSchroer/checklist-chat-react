// Room actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatusDucks';
import * as chatApi from '../../api/chatApi';

const prefix = 'checklist-chat/room/';
export const SAVE_ROOM_SUCCESS = `${prefix}SAVE_ROOM_SUCCESS`;
export const LOAD_ROOMS_SUCCESS = `${prefix}LOAD_ROOMS_SUCCESS`;
export const SET_ROOM_ID_SUCCESS = `${prefix}SET_ROOM_ID_SUCCESS`;
export const SET_ROOM_INFO_SUCCESS = `${prefix}SET_ROOM_INFO_SUCCESS`;

// Actions:

export const loadRoomsSuccess = (rooms) => ({type: LOAD_ROOMS_SUCCESS, rooms});
export const saveRoomSuccess = (rooms) => ({type: SAVE_ROOM_SUCCESS, rooms});
export const setRoomIdSuccess = (roomId) => ({type: SET_ROOM_ID_SUCCESS, roomId});
export const setRoomInfoSuccess = (roomInfo) => ({type: SET_ROOM_INFO_SUCCESS, roomInfo});

export function loadRooms() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return chatApi.getRooms().then(rooms => {
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

        return chatApi.saveRoom(roomInfo).then(room =>
        {
            dispatch(saveRoomSuccess(room));
            chatApi.getRooms().then(rooms => {
                dispatch(loadRoomsSuccess(rooms));
            });
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function setRoomId(roomId) {
    return dispatch => dispatch(setRoomIdSuccess(roomId));
}

export function setRoomInfo(roomId) {
    if (roomId) {
        return dispatch => {
            dispatch(beginAjaxCall());
            return chatApi.getRoomInfo(roomId).then(roomInfo => {
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

export function roomsReducer(rooms = initialState.rooms, action) {

    const actionType = action.type;

    switch (actionType) {

        case LOAD_ROOMS_SUCCESS:
            return action.rooms;

        default:
            return rooms;
    }
}

export function roomIdReducer(roomId = initialState.roomId, action) {
    const actionType = action.type;

    switch (actionType) {

        case SET_ROOM_ID_SUCCESS:
            return action.roomId;

        default:
            return roomId;
    }
}

export function roomInfoReducer(roomInfo = initialState.roomInfo, action) {
    const actionType = action.type;

    switch (actionType) {

        case SET_ROOM_INFO_SUCCESS:
            return action.roomInfo;

        default:
            return roomInfo;
    }
}
