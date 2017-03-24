import React from 'react';
import {storiesOf, linkTo} from '@kadira/storybook';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import RoomInfo from './RoomInfo';

storiesOf('RoomInfo', module)
    .addDecorator(storybookFrameDecorator)

    .add('RoomInfo', () => (
        <RoomInfo
            room={{
                roomName: 'room name',
                description: 'description',
                phoneInfo: '(999) 999-9999 x-9999'
            }}
            onEditRequest={linkTo('RoomInfoEditorModal', 'existing room')} />
    ));
