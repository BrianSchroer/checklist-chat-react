import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {HomePage} from './HomePage';

storiesOf('HomePage', module)
    .add('with no current chat rooms', () => (
        <HomePage
            rooms={[]}
            actions={{
                setRoomId: () => action('setRoomId')
            }}
        />
    ))

    .add('with chat rooms', () => (
        <HomePage
            rooms={[
                { roomId: 1, roomName: 'room name 1', description: 'room description 1' },
                { roomId: 1, roomName: 'room name 2' },
                { roomId: 1, roomName: 'room name 3', description: 'room description 3' }
            ]}
            actions={{
                setRoomId: () => action('setRoomId')
            }}
        />
    ));
