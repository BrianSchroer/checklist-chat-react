// Current checklist item sequence number actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';

const prefix = 'checklist-chat/checklist-item-sequence-number/';
export const SET_SEQUENCE_NUMBER_SUCCESS = `${prefix}SET_SEQUENCE_NUMBER_SUCCESS`;

// Action creators:

export function setSequenceNumberSuccess(sequenceNumber) {
    return {type: SET_SEQUENCE_NUMBER_SUCCESS, sequenceNumber};
}

export function setChecklistItemSequenceNumber(sequenceNumber) {
    return setSequenceNumberSuccess(sequenceNumber);
}

// Reducers:

export default function reducer(sequenceNumber = initialState.checklistItemSequenceNumber, action) {
    const actionType = action.type;

    switch (actionType) {

        case SET_SEQUENCE_NUMBER_SUCCESS:
            return action.sequenceNumber;

        default:
            return sequenceNumber;
    }
}
