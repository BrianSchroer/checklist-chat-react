import React from 'react';
import { storiesOf, linkTo } from '@storybook/react';
import { ChatMessageEditorModal } from './ChatMessageEditorModal';
import { withInfoDecorator } from '../../../../tools/storybook';

storiesOf('ChatMessageEditorModal', module)
  .addDecorator(withInfoDecorator)
  .add('ChatMessageEditorModal', () => (
    <ChatMessageEditorModal
      roomId="12345"
      shouldFocus={false}
      actions={{}}
      onCloseRequest={linkTo('ChatButtons')}
    />
  ));
