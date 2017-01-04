// Modal dialog actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)
import initialState from './store/initialState';
import * as modalDialogType from './modalDialogType';

const prefix = 'checklist-chat/modalDialog/';
export const MODAL_DIALOG_REQUEST_SUCCESS = `${prefix}MODAL_DIALOG_REQUEST_SUCCESS`;

// Action creators:

export const setModalDialogRequestSuccess =
    (request) => ({type: MODAL_DIALOG_REQUEST_SUCCESS, request});

export function requestModalDialog(typ, keys) {
    return (dispatch) => dispatch(setModalDialogRequestSuccess({type: typ, keys}));
}

export function requestRoomInfoModalDialog(roomId) {
    return requestModalDialog(modalDialogType.ROOM, [roomId]);
}

export function requestChatMessageModalDialog() {
    return requestModalDialog(modalDialogType.CHAT_MESSAGE, []);
}

export function requestChecklistItemModalDialog(roomId, sequenceNumber) {
    return requestModalDialog(modalDialogType.CHECKLIST_ITEM, [roomId, sequenceNumber]);
}

export function hideModalDialog() {
    return requestModalDialog(modalDialogType.NONE, []);
}

// Reducers:

export default function reducer(request = initialState.modalDialogRequest, action) {
    const actionType = action.type;

    switch (actionType) {

        case MODAL_DIALOG_REQUEST_SUCCESS:
            return action.request;

        default:
            return request;
    }
}
