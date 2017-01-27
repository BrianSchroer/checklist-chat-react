import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import enzymeHelper from '../../util/enzymeHelper';
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
});
