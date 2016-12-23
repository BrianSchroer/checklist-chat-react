// Modal dialog actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)
import initialState from './store/initialState';
import * as modalDialogType from './modalDialogType';

const prefix = 'checklist-chat/modalDialog/';
const SET_MODAL_DIALOG_SUCCESS = `${prefix}SET_MODAL_DIALOG_SUCCESS`;

// Action creators:

export function setModalDialogSuccess(modalDialog) {
    return {type: SET_MODAL_DIALOG_SUCCESS, modalDialog};
}

export function showModalDialog(modalDialog) {
    return setModalDialogSuccess(modalDialog);
}

export function showRoomInfoModalDialog() {
    return setModalDialogSuccess(modalDialogType.ROOM);
}

export function hideModalDialog() {
    return setModalDialogSuccess(modalDialogType.NONE);
}

// Reducers:

export default function reducer(modalDialog = initialState.modalDialog, action) {
    const actionType = action.type;

    switch (actionType) {

        case SET_MODAL_DIALOG_SUCCESS:
            return action.modalDialog;

        default:
            return modalDialog;
    }
}
