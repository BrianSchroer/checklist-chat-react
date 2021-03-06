import React from 'react';
import {
  storiesOf,
  action,
  infoDecorator
} from '../../../../tools/storybook';
import { chatMessageType } from '../../chat';
import { ChatPriorityNotificationModal } from './ChatPriorityNotificationModal';

storiesOf('ChatPriorityNotificationModal', module)
  .addDecorator(infoDecorator)
  .add('ChatPriorityNotificationModal', () => (
    <ChatPriorityNotificationModal
      chatMessage={{
        chatMessageType: chatMessageType.CHAT,
        userName: 'Sue Pervisor',
        timeStamp: '2016-12-08T14:57:10.222Z',
        text: 'Grow up, people! *@#$% profanity will not be tolerated!'
      }}
      onCloseRequest={action('onCloseRequest')}
    />
  ));
