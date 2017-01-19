import React from 'react';
import {storiesOf} from '@kadira/storybook';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';
import {ChecklistButtons} from './ChecklistButtons';

storiesOf('ChecklistButtons', module)
    .addDecorator(storyFrameDecorator)

    .add('ChecklistButtons', () => (
        <ChecklistButtons actions={{}} />
    ));
