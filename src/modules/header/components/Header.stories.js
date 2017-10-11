import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import {
  storybookFrameDecorator,
  withInfoDecorator
} from '../../../../tools/storybook';
import Header from './Header';

storiesOf('Header', module)
  .addDecorator(withInfoDecorator)
  .addDecorator(storybookFrameDecorator)
  .add('Header', () => (
    <MemoryRouter>
      <Header isLoading={false} />
    </MemoryRouter>
  ));
