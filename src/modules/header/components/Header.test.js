import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import Header from './Header';

describe('Header', () => {
  const enzymeHelper = new EnzymeHelper(<Header isLoading={false} />);
  enzymeHelper.shallow();

  it('should render navbar', () => {
    enzymeHelper.findSingle('div#appHeaderRow > nav.navbar');
  });

  it('should render home page link with logo', () => {
    enzymeHelper.findSingle(
      'div#appHeaderRow > nav.navbar > div.nav > Link.navbar-brand > div.header-logo-img'
    );
  });
});
