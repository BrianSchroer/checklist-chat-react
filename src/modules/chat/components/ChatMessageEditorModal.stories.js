import React from 'react';
import {storiesOf, linkTo} from '@storybook/react';
import {ChatMessageEditorModal} from './ChatMessageEditorModal';

storiesOf('ChatMessageEditorModal', module)
    .add('ChatMessageEditorModal', () => (
        <ChatMessageEditorModal
            shouldFocus={false}
            actions={{}}
            onCloseRequest={linkTo('ChatButtons')}
        />
    ));
