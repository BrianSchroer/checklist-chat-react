import React from 'react';
import { storiesOf, linkTo } from '@storybook/react';
import { withInfoDecorator } from '../../../../tools/storybook';
import { ChatParticipantsModal } from './ChatParticipantsModal';

storiesOf('ChatParticipantsModal', module)
  .addDecorator(withInfoDecorator)
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
