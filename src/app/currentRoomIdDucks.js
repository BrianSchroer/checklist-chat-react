// Current room ID actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from './store/initialState';

const prefix = 'checklist-chat/currentRoomId/';
export const SET_CURRENT_ROOM_ID_SUCCESS = `${prefix}SET_CURRENT_ROOM_ID_SUCCESS`;

// Action creators:

export function setCurrentRoomIdSuccess(roomId) {
    return {type: SET_CURRENT_ROOM_ID_SUCCESS, roomId};
}

export function setCurrentRoomId(roomId) {
    return setCurrentRoomIdSuccess(roomId);
}

// Reducers:

export default function reducer(roomId = initialState.currentRoomId, action) {
    const actionType = action.type;

    switch (actionType) {

        case SET_CURRENT_ROOM_ID_SUCCESS:
            return action.roomId;

        default:
            return roomId;
    }
}
