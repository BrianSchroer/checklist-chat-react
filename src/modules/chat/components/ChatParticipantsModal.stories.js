import React from 'react';
import {
  storiesOf,
  linkTo,
  infoDecorator
} from '../../../../tools/storybook';
import { ChatParticipantsModal } from './ChatParticipantsModal';

storiesOf('ChatParticipantsModal', module)
  .addDecorator(infoDecorator)
  .add('ChatParticipantsModal', () => (
    <ChatParticipantsModal
      chatParticipants={[
        {
          name: 'name',
          department: 'department',
          title: 'title',
          connection: 'connection'
        },
        {
          name: 'name',
          department: 'department',
          title: 'title',
          connection: 'connection'
        },
        {
          name: 'name',
          department: 'department',
          title: 'title',
          connection: 'connection'
        },
        {
          name: 'name',
          department: 'department',
          title: 'title',
          connection: 'connection'
        },
        {
          name: 'name',
          department: 'department',
          title: 'title',
          connection: 'connection'
        },
        {
          name: 'name',
          department: 'department',
          title: 'title',
          connection: 'connection'
        }
      ]}
      onCloseRequest={linkTo('ChatButtons')}
    />
  ));
