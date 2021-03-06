import React from 'react';
import { storiesOf, infoDecorator } from '../../../../tools/storybook';
import { MemoryRouter } from 'react-router-dom';
import RoomList from './RoomList';

storiesOf('RoomList', module)
  .addDecorator(infoDecorator)
  .add('RoomList', () => (
    <MemoryRouter>
      <div className="container">
        <RoomList
          rooms={[
            { roomName: 'room name 1', description: 'description 1' },
            { roomName: 'room name 2' },
            { roomName: 'room name 3', description: 'description 3' }
          ]}
        />
      </div>
    </MemoryRouter>
  ));
