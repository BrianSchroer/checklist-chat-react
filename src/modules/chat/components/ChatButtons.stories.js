import React from 'react';
import ChatButtons from './ChatButtons';
import { storybookStories, linkTo } from '../../../../tools/storybook';

storybookStories('ChatButtons').add('ChatButtons', () => (
  <ChatButtons
    actions={{}}
    onChatMessageAddRequest={linkTo('ChatMessageEditorModal')}
    onChatParticipantsRequest={linkTo('ChatParticipantsModal')}
  />
));
