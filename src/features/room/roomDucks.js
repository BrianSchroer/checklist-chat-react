// Room actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatusDucks';
import {loadChatMessagesForRoom} from '../../features/chat/chatDucks';
import {loadChecklistItemsForRoom} from '../../features/checklist/checklistItemDucks';
import * as mockJsonDbApi from '../../api/mockJsonDbApi';

const prefix = 'checklist-chat/room/';
export const SAVE_ROOM_SUCCESS = `${prefix}SAVE_ROOM_SUCCESS`;
export const LOAD_ROOMS_SUCCESS = `${prefix}LOAD_ROOMS_SUCCESS`;
export const SET_ROOM_ID_COMPLETE = `${prefix}SET_ROOM_ID_COMPLETE`;

// Actions:

export const loadRoomsSuccess = (rooms) => ({type: LOAD_ROOMS_SUCCESS, rooms});
export const saveRoomSuccess = (roomInfo) => ({type: SAVE_ROOM_SUCCESS, roomInfo});
export const setRoomIdSuccess = (roomId) => ({type: SET_ROOM_ID_COMPLETE, roomId});

export function loadRooms() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return mockJsonDbApi.getRooms().then(rooms => {
            dispatch(loadRoomsSuccess(rooms));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function saveRoomInfo(roomInfo, userId) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return mockJsonDbApi.updateRoomInfo(roomInfo, userId).then(() =>
        {
            mockJsonDbApi.getRooms().then(rooms => {
                dispatch(loadRoomsSuccess(rooms));
                if (roomInfo.id) {
                    dispatch(loadChatMessagesForRoom(roomInfo.id));
                }
            });
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function joinChat(roomId, userId) {
    return dispatch => {
        mockJsonDbApi.joinChat(roomId, userId);
        dispatch(setRoomIdSuccess(roomId));
        dispatch(loadChatMessagesForRoom(roomId));
        dispatch(loadChecklistItemsForRoom(roomId));
    };
}

export function setRoomId(roomId) {
    return dispatch => dispatch(setRoomIdSuccess(roomId));
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

        case SET_ROOM_ID_COMPLETE:
            return action.roomId;

        default:
            return roomId;
    }
}
