import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import enzymeHelper from '../../../util/enzymeHelper';
import Header from './Header';

const defaultProps = {
    isLoading: false
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<Header {...props} />);
}

describe('Header', () => {
    it('should render navbar', () => {
        enzymeHelper.findSingle(render(), 'div#appHeaderRow > nav.navbar');
    });

    it('should render home page link with logo', () => {
        enzymeHelper.findSingle(render(),
            'div#appHeaderRow > nav.navbar > div.nav > IndexLink > div.header-logo-img');
    });
});
