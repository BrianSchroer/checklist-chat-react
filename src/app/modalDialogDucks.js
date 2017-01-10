// Modal dialog actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)
import initialState from './store/initialState';
import * as modalDialogType from './modalDialogType';

const prefix = 'checklist-chat/modalDialog/';
export const MODAL_DIALOG_REQUEST_PROCESSED = `${prefix}MODAL_DIALOG_REQUEST_PROCESSED`;

// Action creators:

export const modalDialogRequestProcessed =
    (request) => ({type: MODAL_DIALOG_REQUEST_PROCESSED, request});

export function requestModalDialog(typ, keys) {
    return (dispatch) => dispatch(modalDialogRequestProcessed({type: typ, keys}));
}

export function requestRoomInfoModalDialog(roomId) {
    return requestModalDialog(modalDialogType.ROOM, [roomId]);
}

export function requestChatMessageModalDialog() {
    return requestModalDialog(modalDialogType.CHAT_MESSAGE, []);
}

export function requestChatParticipantsModalDialog(roomId) {
    return requestModalDialog(modalDialogType.CHAT_PARTICIPANTS, [roomId]);
}

export function requestChecklistItemModalDialog(roomId, sequenceNumber) {
    return requestModalDialog(modalDialogType.CHECKLIST_ITEM, [roomId, sequenceNumber]);
}

export function requestChecklistItemCommentModalDialog(roomId, sequenceNumber) {
    return requestModalDialog(modalDialogType.CHECKLIST_ITEM_COMMENT, [roomId, sequenceNumber]);
}

export function hideModalDialog() {
    return requestModalDialog(modalDialogType.NONE, []);
}

// Reducers:

export default function reducer(request = initialState.modalDialogRequest, action) {
    const actionType = action.type;

    switch (actionType) {

        case MODAL_DIALOG_REQUEST_PROCESSED:
            return action.request;

        default:
            return request;
    }
}
