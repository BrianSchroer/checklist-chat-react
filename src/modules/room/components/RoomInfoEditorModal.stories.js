import React from 'react';
import {
  storiesOf,
  linkTo,
  infoDecorator
} from '../../../../tools/storybook';
import { RoomInfoEditorModal } from './RoomInfoEditorModal';

storiesOf('RoomInfoEditorModal', module)
  .addDecorator(infoDecorator)
  .add('new room', () => (
    <RoomInfoEditorModal
      room={{ id: '', roomName: '', description: '', phoneInfo: '' }}
      isNewRoom
      shouldFocus={false}
      actions={{}}
      onCloseRequest={linkTo('HomePage')}
    />
  ))
  .add('existing room', () => (
    <RoomInfoEditorModal
      room={{
        id: 'id',
        roomName: 'roomName',
        description: 'description',
        phoneInfo: 'phoneInfo'
      }}
      isNewRoom={false}
      shouldFocus={false}
      actions={{}}
      onCloseRequest={linkTo('RoomInfo')}
    />
  ));
