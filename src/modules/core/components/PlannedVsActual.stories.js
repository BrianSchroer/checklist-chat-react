import React from 'react';
import {storiesOf} from '@storybook/react';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import PlannedVsActual from './PlannedVsActual';

storiesOf('PlannedVsActual', module)
    .addDecorator(storybookFrameDecorator)

    .add('when planned = actual', () => (
        <PlannedVsActual planned="planned" actual="planned" />
    ))

    .add('when planned != actual', () => (
        <PlannedVsActual planned="planned" actual="actual" />
    ));
