import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {RoomInfoEditorModal} from './RoomInfoEditorModal';

storiesOf('RoomInfoEditorModal', module)
    .add('new room', () => (
        <RoomInfoEditorModal
            room={{id: '', roomName: '', description: '', phoneInfo: ''}}
            userId="userId"
            isNewRoom={true}
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
         />
    ))
    .add('existing room', () => (
        <RoomInfoEditorModal
            room={{id: 'id', roomName: 'roomName', description: 'description', phoneInfo: 'phoneInfo'}}
            userId="userId"
            isNewRoom={false}
            actions={{}}
            onCloseRequest={action('onCloseRequest')}
         />
    ));
