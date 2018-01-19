import React from 'react';
import { EnzymeHelper } from '../../util/testHelpers';
import { App } from './App';

describe('App', () => {
  const app = <App children={['child1', 'child2']} isLoading={false} />;

  const enzymeHelper = new EnzymeHelper(app);
  enzymeHelper.shallow();

  it('should render appPage div', () => {
    const div = enzymeHelper.findSingle('div#appPage');
    expect(div.hasClass('app-page'));
  });

  it('should render ModalManager', () => {
    enzymeHelper.findSingle('div#appPage > ModalManager', 'Connect');
  });

  it('should render Header', () => {
    enzymeHelper.findSingle('div#appPage > Header', 'Connect');
  });
});
