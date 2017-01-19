import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ChatButtons from './ChatButtons';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';

storiesOf('ChatButtons', module)
    .addDecorator(storyFrameDecorator)

    .add('ChatButtons', () => (
        <ChatButtons actions={{}} />
    ));
