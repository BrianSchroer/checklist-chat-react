import React from 'react';
import {storiesOf} from '@kadira/storybook';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';
import ChecklistAddInvitation from './ChecklistAddInvitation';

storiesOf('ChecklistAddInvitation', module)
    .addDecorator(storyFrameDecorator)

    .add('ChecklistAddInvitation', () => (
        <table className="table checklist-table">
            <ChecklistAddInvitation />
        </table>
    ));
