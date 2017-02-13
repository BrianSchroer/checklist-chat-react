import expect from 'expect';
import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import {ChatRoomPage} from './ChatRoomPage';

const defaultProps = {
    routeParams: {},
    userId: 'TestUserId',
    room: {id: 123},
    checklistItems: [],
    chatMessages: [],
    actions: {
        joinChat: () => {}
    }
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<ChatRoomPage {...props} />);
}

describe('ChatRoomPage', () => {
    it('should render RoomInfo', () => {
        const roomInfo = enzymeHelper.findSingle(render(),
            'div.chat-room-page > div.chat-room-chat-column > div.chat-room-room-info > RoomInfo');
        expect(roomInfo.props().room).toBe(defaultProps.room);
    });

    it('should render ChatButtons', () => {
        enzymeHelper.findSingle(render(),
            'div.chat-room-page > div.chat-room-chat-column > div.chat-room-buttons > ChatButtons');
    });

    it('should render Checklist', () => {
        enzymeHelper.findSingle(render(),
            'div.chat-room-page > div.chat-room-checklist-column > Checklist');
    });

    it('should render ChecklistButtons', () => {
        enzymeHelper.findSingle(render(),
            'div.chat-room-page > div.chat-room-checklist-column > div.chat-room-buttons > ChecklistButtons');
    });
});
