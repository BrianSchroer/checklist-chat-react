import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';
import ChecklistButtons from './ChecklistButtons';

storiesOf('ChecklistButtons', module)
    .addDecorator(storyFrameDecorator)

    .add('ChecklistButtons', () => (
        <ChecklistButtons
            actions={{}}
            onChecklistItemAddRequest={action('onChecklistItemAddRequest')}
        />
    ));
