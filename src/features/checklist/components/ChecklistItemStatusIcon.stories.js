import React from 'react';
import {storiesOf} from '@kadira/storybook';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';
import * as checklistItemStatus from '../checklistItemStatus';
import ChecklistItemStatusIcon from './ChecklistItemStatusIcon';

storiesOf('ChecklistItemStatusIcon', module)
    .addDecorator(storyFrameDecorator)

    .add('icons', () => (
        <ul className="list-unstyled">
            {checklistItemStatus.options.map(opt =>
                <li key={opt.value}><ChecklistItemStatusIcon status={opt.value} /> {opt.text}</li>
            )}
        </ul>
    ));
