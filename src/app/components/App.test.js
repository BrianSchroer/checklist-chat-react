import React from 'react';
import {expect, shallow, enzymeHelper} from '../../util/testHelpers';
import {App} from './App';

const testChildren = ['child1', 'child2'];

const defaultProps = {
    children: testChildren,
    isLoading: false
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<App {...props} />);
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

    it('should render children', () => {
        const div = enzymeHelper.findSingle(render(), 'div#appPage > div#appMainRow');

        const actualChildren = div.props().children;
        expect(actualChildren.length).toEqual(testChildren.length);

        for (let i = 0; i < testChildren.length; i++) {
            expect(actualChildren[i]).toBe(testChildren[i]);
        }
    });
});
