import React from 'react';
import {shallow, enzymeHelper} from '../../util/testHelpers';
import * as modalDialogType from '../modalDialogType';
import {ModalManager} from './ModalManager';

const typeMap = new Map([
    [modalDialogType.NONE, null],
    [modalDialogType.CHAT_MESSAGE, 'ChatMessageEditorModal'],
    [modalDialogType.CHAT_PARTICIPANTS, 'ChatParticipantsModal'],
    [modalDialogType.CHAT_PRIORITY_NOTIFICATION, 'ChatPriorityNotificationModal'],
    [modalDialogType.CHECKLIST_ITEM, 'ChecklistItemEditorModal'],
    [modalDialogType.CHECKLIST_ITEM_COMMENT, 'ChecklistItemCommentEditorModal'],
    [modalDialogType.ROOM, 'RoomInfoEditorModal']
]);

function render(type) {
    const props = {
        modalDialogRequest: { type: type },
        actions: {}
    };
    return shallow(<ModalManager {...props}/>);
}

describe('ModalManager', () => {
    Object.keys(modalDialogType).forEach(type => {
        it(`should render the expected component for modalDialogType.${type}`, () => {
            if (!typeMap.has(type)) {
                throw(`Missing test for modalDialogType.${type}.`);
            }

            const tag = typeMap.get(type);
            const wrapper = render(type);

            if (tag == null) {
                expect(wrapper.get(0)).toBe(null);

            } else {
                enzymeHelper.findSingle(wrapper, tag, 'Connect');
            }
        });
    });

    it('should call hideModalDialog action when closeModal is called', () => {
        let preventDefaultWasCalled = false;
        let hideModalDialogWasCalled = false;

        const props = {
            modalDialogRequest: { type: modalDialogType.ROOM },
            actions: {
                hideModalDialog: () => hideModalDialogWasCalled = true
            }
        };

        const manager = new ModalManager(props, null);

        const event = { preventDefault: () => preventDefaultWasCalled = true};
        manager.closeModal(event);

        expect(preventDefaultWasCalled);
        expect(hideModalDialogWasCalled);
    });
});
