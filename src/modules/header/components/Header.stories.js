import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storybookStories } from '../../../../tools/storybook';
import Header from './Header';

storybookStories('Header').add('Header', () => (
  <MemoryRouter>
    <Header isLoading={false} />
  </MemoryRouter>
));
