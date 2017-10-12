import React from 'react';
import { storybookStories } from '../../../../tools/storybook';
import PlannedVsActual from './PlannedVsActual';

storybookStories('PlannedVsActual')
  .add('when planned = actual', () => (
    <PlannedVsActual planned="planned" actual="planned" />
  ))
  .add('when planned != actual', () => (
    <PlannedVsActual planned="planned" actual="actual" />
  ));
