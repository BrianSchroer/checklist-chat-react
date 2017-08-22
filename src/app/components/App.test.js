import React from 'react';
import {shallow, enzymeHelper} from '../../util/testHelpers';
import {App} from './App';

const testChildren = ['child1', 'child2'];

const defaultProps = {
    children: testChildren,
    isLoading: false
};

function overrideProps(propOverrides) {
    return Object.assign({}, defaultProps, propOverrides);
}

function render(propOverrides = {}) {
    return shallow(<App {...overrideProps(propOverrides)} />);
}

describe('App', () => {
    it('should render appPage div', () => {
        const div = enzymeHelper.findSingle(render(), 'div#appPage');
        expect(div.hasClass('app-page'));
    });

    it('should render ModalManager', () => {
        enzymeHelper.findSingle(render(), 'div#appPage > ModalManager', 'Connect');
    });

    it('should render Header', () => {
        enzymeHelper.findSingle(render(), 'div#appPage > Header', 'Connect');
    });
});
