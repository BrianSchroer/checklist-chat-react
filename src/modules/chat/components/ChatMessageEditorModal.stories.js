import React from 'react';
import { ChatMessageEditorModal } from './ChatMessageEditorModal';
import {
  storiesOf,
  linkTo,
  infoDecorator
} from '../../../../tools/storybook';

storiesOf('ChatMessageEditorModal', module)
  .addDecorator(infoDecorator)
  .add('ChatMessageEditorModal', () => (
    <ChatMessageEditorModal
      roomId="12345"
      shouldFocus={false}
      actions={{}}
      onCloseRequest={linkTo('ChatButtons')}
    />
  ));
