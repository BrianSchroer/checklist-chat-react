import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import enzymeHelper from '../../../util/enzymeHelper';
import RoomList from './RoomList';

const defaultProps = {
    rooms: [
        { id: 1, roomName: 'room 1', description: 'description 1' },
        { id: 2, roomName: 'room 2', description: 'description 2' },
        { id: 3, roomName: 'room 3', description: 'description 3' }
    ]
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<RoomList {...props} />);
}

describe('RoomList', () => {
    it('should render a list item for each room', () => {
        const rooms = defaultProps.rooms;
        const ul = enzymeHelper.findSingle(render(), 'div.jumbotron > ul');
        const listItems = ul.find('li');
        expect(listItems.length).toEqual(rooms.length);

        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
            const li = listItems.at(i);
            const link = enzymeHelper.findSingle(li, 'Link');
            // TODO: Finish this test
        }
    });
});
