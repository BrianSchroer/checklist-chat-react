import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import ChecklistButtons from './ChecklistButtons';

storiesOf('ChecklistButtons', module)
    .addDecorator(storybookFrameDecorator)

    .add('ChecklistButtons', () => (
        <ChecklistButtons
            actions={{}}
            onChecklistItemAddRequest={action('onChecklistItemAddRequest')}
        />
    ));
