import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {RoomInfoEditorModal} from './RoomInfoEditorModal';

storiesOf('RoomInfoEditorModal', module)
    .add('new room', () => (
        <RoomInfoEditorModal
            room={{id: '', roomName: '', description: '', phoneInfo: ''}}
            isNewRoom
            shouldFocus={false}
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
         />
    ))
    .add('existing room', () => (
        <RoomInfoEditorModal
            room={{id: 'id', roomName: 'roomName', description: 'description', phoneInfo: 'phoneInfo'}}
            isNewRoom={false}
            shouldFocus={false}
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
         />
    ));
