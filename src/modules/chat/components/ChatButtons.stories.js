import React from 'react';
import { storiesOf, linkTo } from '@storybook/react';
import ChatButtons from './ChatButtons';
import {
  storybookFrameDecorator,
  withInfoDecorator
} from '../../../../tools/storybook';

storiesOf('ChatButtons', module)
  .addDecorator(withInfoDecorator)
  .addDecorator(storybookFrameDecorator)
  .add('ChatButtons', () => (
    <ChatButtons
      actions={{}}
      onChatMessageAddRequest={linkTo('ChatMessageEditorModal')}
      onChatParticipantsRequest={linkTo('ChatParticipantsModal')}
    />
  ));
