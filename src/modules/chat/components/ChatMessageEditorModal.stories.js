import React from 'react';
import {storiesOf, linkTo} from '@kadira/storybook';
import {ChatMessageEditorModal} from './ChatMessageEditorModal';

storiesOf('ChatMessageEditorModal', module)
    .add('ChatMessageEditorModal', () => (
        <ChatMessageEditorModal
            shouldFocus={false}
            actions={{}}
            onCloseRequest={linkTo('ChatButtons')}
        />
    ));
