import * as modalDialogType from '../modalDialogType';

export default {
    rooms: [],
    roomId: null,
    roomInfo: null,
    chatMessages: [],
    chatParticipants: [],
    checklistItems: [],
    checklistItemSequenceNumber: null,
    ajaxCallsInProgressCount: 0,
    modalDialogRequest: { type: modalDialogType.NONE, keys: []}
};
