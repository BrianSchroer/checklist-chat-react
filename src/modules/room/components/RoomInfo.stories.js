import React from 'react';
import { storybookStories, linkTo } from '../../../../tools/storybook';
import RoomInfo from './RoomInfo';

storybookStories('RoomInfo').add('RoomInfo', () => (
  <RoomInfo
    room={{
      roomName: 'room name',
      description: 'description',
      phoneInfo: '(999) 999-9999 x-9999'
    }}
    onEditRequest={linkTo('RoomInfoEditorModal', 'existing room')}
  />
));
