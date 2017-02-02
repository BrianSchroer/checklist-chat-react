import React from 'react';
import {storiesOf} from '@kadira/storybook';
import storyFrameDecorator from '../../../tools/storybook/storyFrameDecorator';
import PlannedVsActual from './PlannedVsActual';

storiesOf('PlannedVsActual', module)
    .addDecorator(storyFrameDecorator)

    .add('when planned = actual', () => (
        <PlannedVsActual planned="planned" actual="planned" />
    ))

    .add('when planned != actual', () => (
        <PlannedVsActual planned="planned" actual="actual" />
    ));
