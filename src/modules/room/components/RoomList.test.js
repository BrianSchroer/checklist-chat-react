import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import RoomList from './RoomList';

const defaultProps = {
    rooms: [
        { id: 1, roomName: 'room 1', description: 'description 1' },
        { id: 2, roomName: 'room 2', description: '' },
        { id: 3, roomName: 'room 3', description: 'description 3' }
    ]
};

function overrideProps(propOverrides) {
    return Object.assign({}, defaultProps, propOverrides);
}

function render(propOverrides = {}) {
    return shallow(<RoomList RoomList {...overrideProps(propOverrides)} />);
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
            expect(li.node.key).toEqual(room.id.toString());

            const link = enzymeHelper.findSingle(li, 'Link');
            expect(link.props().to).toEqual(`/room/${room.id}`);

            expect(enzymeHelper.findSingle(link, 'strong').text()).toEqual(room.roomName);

            if (room.description) {
                expect(link.children().at(1).text()).toEqual(` - ${room.description}`);
            } else {
                expect(link.children().length).toEqual(1);
            }
        }
    });
});
