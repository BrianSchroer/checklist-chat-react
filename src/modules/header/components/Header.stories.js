import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import Header from './Header';

storiesOf('Header', module)
    .addDecorator(storybookFrameDecorator)

    .add('Header', () => (
        <Header isLoading={false} />
    ));
