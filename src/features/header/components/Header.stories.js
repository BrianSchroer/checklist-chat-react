import React from 'react';
import {storiesOf} from '@kadira/storybook';
import storyFrameDecorator from '../../../../tools/storybook/storyFrameDecorator';
import Header from './Header';

storiesOf('Header', module)
    .addDecorator(storyFrameDecorator)

    .add('Header', () => (
        <Header isLoading="false" />
    ));
