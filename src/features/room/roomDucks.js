// Room actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import { beginAjaxCall, ajaxCallError } from '../../app/ajaxStatus/ajaxStatusDucks';

const prefix = 'checklist-chat/room/';
export const LOAD_ROOMS_SUCCESS = `${prefix}LOAD_ROOMS_SUCCESS`;

// Actions:

export function loadRoomsSuccess(rooms) {
    return { type: LOAD_ROOMS_SUCCESS, rooms };
}

export function loadRooms() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return loadFakeRooms().then(rooms => {
            dispatch(loadRoomsSuccess(rooms));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

function loadFakeRooms() {
    return new Promise((resolve) => {
        resolve([
            { id: '1', roomName: 'Chat Room 1', description: 'This is the description for chat room 1.', phoneInfo: 'Conference Bridge: 877-909-4550 - passcode 123456' },
            { id: '2', roomName: 'Chat Room 2', description: 'This is the description for chat room 2.', phoneInfo: 'Conference Bridge: 877-909-4550 - passcode 123456' },
            { id: '3', roomName: 'Chat Room 3', description: 'This is the description for chat room 3.', phoneInfo: '' }
        ]);
    });
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
