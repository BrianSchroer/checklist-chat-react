import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';
import RoomInfo from './RoomInfo';

storiesOf('RoomInfo', module)
    .addDecorator(storyFrameDecorator)

    .add('RoomInfo', () => (
        <RoomInfo room={{
            roomName: 'room name',
            description: 'description',
            phoneInfo: '(999) 999-9999 x-9999'
        }}
            onEditRequest={action('onEditRequest')} />
    ));
