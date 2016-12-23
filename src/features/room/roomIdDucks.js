// Current room ID actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';

const prefix = 'checklist-chat/roomId/';
const SET_ROOM_ID_SUCCESS = `${prefix}SET_ROOM_ID_SUCCESS`;

// Action creators:

export function setRoomIdSuccess(roomId) {
    return {type: SET_ROOM_ID_SUCCESS, roomId};
}

export function setRoomId(roomId) {
    return setRoomIdSuccess(roomId);
}

// Reducers:

export default function reducer(roomId = initialState.roomId, action) {
    const actionType = action.type;

    switch (actionType) {

        case SET_ROOM_ID_SUCCESS:
            return action.roomId;

        default:
            return roomId;
    }
}
