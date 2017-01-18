import React from 'react';
import {storiesOf} from '@kadira/storybook';
import RoomList from './RoomList';

storiesOf('RoomList', module)
    .add('RoomList', () => (
         <div className="container">
            <RoomList rooms={[
                { roomName: 'room name 1', description: 'description 1' },
                { roomName: 'room name 2' },
                { roomName: 'room name 3', description: 'description 3' }
                ]}/>
        </div>
    ));
