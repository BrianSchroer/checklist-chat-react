import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf, action } from '@storybook/react';
import { withInfoDecorator } from '../../../../tools/storybook';
import { HomePage } from './HomePage';

storiesOf('HomePage', module)
  .addDecorator(withInfoDecorator)
  .add('with no current chat rooms', () => (
    <HomePage
      rooms={[]}
      actions={{
        setRoomId: () => action('setRoomId')
      }}
    />
  ))
  .add('with chat rooms', () => (
    <MemoryRouter>
      <HomePage
        rooms={[
          {
            roomId: 1,
            roomName: 'room name 1',
            description: 'room description 1'
          },
          { roomId: 2, roomName: 'room name 2' },
          {
            roomId: 3,
            roomName: 'room name 3',
            description: 'room description 3'
          }
        ]}
        actions={{
          setRoomId: () => action('setRoomId')
        }}
      />
    </MemoryRouter>
  ));
