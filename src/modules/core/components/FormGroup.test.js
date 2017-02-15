import React from 'react';
import {expect, shallow, enzymeHelper} from '../../../util/testHelpers';
import FormGroup from './FormGroup';

const defaultProps = {
    name: 'TestName',
    label: 'TestLabel',
    error: null,
    children: []
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<FormGroup {...props} />);
}

describe('FormGroup', () => {
    it('should render div with "form-group" class when there is no error', () => {
        const div = render().find('div').first();
        expect(div.hasClass('form-group'));
        expect(div.hasClass('has-error')).toBe(false);
    });

    it('should render div with "form-group" and "has-error" classes when there is an error', () => {
        const div = render({ error: 'test error message' }).find('div').first();
        expect(div.hasClass('form-group'));
        expect(div.hasClass('has-error'));
    });

    it('should render a label with expected attributes', () => {
        const label = enzymeHelper.findSingle(render(), 'div > label');
        expect(label.props().htmlFor).toBe(defaultProps.name);
        expect(label.text()).toBe(defaultProps.label);
    });

    it('should render div.field containing children', () => {
        const testChildren = ['child1', 'child2'];

        const fieldDiv = enzymeHelper.findSingle(
            render({ children: testChildren }),
            'div > div.field');

        const actualChildren = fieldDiv.props().children;
        expect(actualChildren.length).toBeGreaterThan(0);
        expect(actualChildren[0]).toBe(testChildren);
    });

    it('should not render an error message when there is no error', () => {
        enzymeHelper.assertNoMatch(render({ error: '' }), 'div > div.alert-danger');
    });

    it('should render an error message when there is an error', () => {
        const errorMessage = 'test error message';
        const errorDiv = enzymeHelper.findSingle(
            render({ error: errorMessage }), 'div > div.alert-danger');

        expect(errorDiv.hasClass('alert'));
        expect(errorDiv.text()).toBe(errorMessage);
    });
});
