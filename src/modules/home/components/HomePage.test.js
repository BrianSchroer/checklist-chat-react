import React from 'react';
import{shallow, enzymeHelper} from '../../../util/testHelpers';
import {HomePage} from './HomePage';

const defaultActions = {
    setRoomId: () => {},
    requestRoomInfoModalDialog: () => {}
};

const defaultProps = {
    rooms: [
        { roomName: 'test room name' }
    ],
    actions: defaultActions
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<HomePage {...props} />);
}

function findNoRoomsParagraph(renderedWrapper) {
    return enzymeHelper.find(renderedWrapper,
        'div.home-page > div.row > div > div.jumbotron > p.lead');
}

describe('HomePage', () => {
    it('should render a RoomList', () => {
        const elem = enzymeHelper.findSingle(render(), 'div.home-page > div.row > div > RoomList');
        expect(elem.props().rooms).toBe(defaultProps.rooms);
    });

    it('should display a "start a chat" message when there are no rooms', () => {
        const p = findNoRoomsParagraph(render( {rooms: []} ));
        expect(p.length).toEqual(1);
        expect(p.text()).toEqual("There aren't any chats in progress right now. Why not start one?");
    });

    it('should not display a "start a chat" message when there are rooms', () => {
        const p = findNoRoomsParagraph(render( {rooms: [{roomName: 'room 1'}]} ));
        expect(p.length).toEqual(0);
    });

    it('should handle new chat room request', () => {
        let wasCalled = false;
        let actualRoomId = undefined;

        const testActions = {
            requestRoomInfoModalDialog: (roomId) => {
                wasCalled = true;
                actualRoomId = roomId;}
        };

        const actions = Object.assign({}, defaultActions, testActions);

        const homePage = render({actions});

        const button = enzymeHelper.findSingle(homePage, 'input');
        button.simulate('click');

        expect(wasCalled);
        expect(actualRoomId).toBe(null);
    });
});
