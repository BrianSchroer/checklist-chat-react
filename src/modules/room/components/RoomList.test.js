import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import RoomList from './RoomList';

describe('RoomList', () => {
  const roomList = (
    <RoomList
      rooms={[
        { id: 1, roomName: 'room 1', description: 'description 1' },
        { id: 2, roomName: 'room 2', description: '' },
        { id: 3, roomName: 'room 3', description: 'description 3' }
      ]}
    />
  );

  const enzymeHelper = new EnzymeHelper(roomList);

  it('should render a list item for each room', () => {
    const rooms = roomList.props.rooms;

    enzymeHelper.shallow();

    const ul = enzymeHelper.findSingle('div.jumbotron > ul');
    const listItems = ul.find('li');
    expect(listItems.length).toEqual(rooms.length);

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];

      const li = listItems.at(i);
      expect(li.key()).toEqual(room.id.toString());

      const link = enzymeHelper.findSingleIn(li, 'Link');
      expect(link.props().to).toEqual(`/room/${room.id}`);

      expect(enzymeHelper.findSingleIn(link, 'strong').text()).toEqual(
        room.roomName
      );

      if (room.description) {
        expect(
          link
            .children()
            .at(1)
            .text()
        ).toEqual(` - ${room.description}`);
      } else {
        expect(link.children().length).toEqual(1);
      }
    }
  });
});
