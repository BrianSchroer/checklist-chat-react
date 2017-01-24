import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
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

            const node = render(type).nodes[0];
            const tag = typeMap.get(type);

            if (tag == null) {
                expect(node).toBe(null);
            } else {
                expect(node.type.displayName).toInclude(tag);
            }
        });
    });
});
