import React from 'react';
import {storiesOf} from '@kadira/storybook';
import PlannedVsActual from './PlannedVsActual';

storiesOf('PlannedVsActual', module)
    .add('when planned = actual', () => (
        <PlannedVsActual planned="planned" actual="planned" />
    ))
    .add('when planned != actual', () => (
        <PlannedVsActual planned="planned" actual="actual" />
    ));
