import expect from 'expect';
import deepFreeze from 'deep-freeze';
import reducer, * as modalDialogDucks from './modalDialogDucks';
import * as modalDialogType from './modalDialogType';

const initialState = {
    modalDialogRequest: { type: modalDialogType.NONE, keys: [] }
};

deepFreeze(initialState);

describe('modalDialogDucks.reducer', () => {
    Object.keys(modalDialogType).forEach(typ => {
        it(`should return expected value for MODAL_DIALOG_REQUEST_SUCCESS / modalDialogType.${typ}`, () => {
            const request = { type: typ, keys: []};
            const action = {
                type: modalDialogDucks.MODAL_DIALOG_REQUEST_SUCCESS,
                request
            };
            expect(reducer(initialState.modalDialogRequest, action)).toEqual(request);
        });
    });

    [ 'unexpected action type', undefined ].forEach(actionType => {
        it(`should return initial state for unexpected action type "${actionType}"`, () => {
            expect(reducer(initialState.modalDialogRequest, {type: actionType}))
                .toEqual(initialState.modalDialogRequest);
        });
    });
});
