import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import TextInput from './TextInput';
import enzymeHelper from '../util/enzymeHelper';

function renderWith(props) {
    return shallow(<TextInput {...props}/>);
}

describe('TextInput', () => {
    let props = {};
    let onChangeWasCalled = false;

    function initializeProps() {
        onChangeWasCalled = false;

        return {
            name: 'test name',
            label: 'test label',
            onChange: () => { onChangeWasCalled = true; },
            placeholder: 'test placeholder',
            value: 'test value',
            error: ''
        };
    }

    beforeEach(function() {
        onChangeWasCalled = false;
        props = initializeProps();
    });

    it('should render div with "form-group" class when there is no error', () => {
        const div = renderWith(props).find('div').first();
        expect(div.hasClass('form-group'));
        expect(div.hasClass('has-error')).toBe(false);
    });

    it('should render div with "form-group" and "has-error" classes when there is an error', () => {
        props.error = 'test error message';
        const div = renderWith(props).find('div').first();
        expect(div.hasClass('form-group'));
        expect(div.hasClass('has-error')).toBe(true);
    });

    it('should render a label with expected attributes', () => {
        const label = enzymeHelper.findSingle(renderWith(props), 'div > label');
        expect(label.props().htmlFor).toBe(props.name);
        expect(label.text()).toBe(props.label);
    });

    it('should wrap input and error in a "field" div', () => {
        const div = enzymeHelper.nestedFind(renderWith(props), 'div > div').first();
        expect(div.hasClass('field'));
    });

    it('should not render an error message when there is no error', () => {
        props.error = '';
        expect(enzymeHelper.nestedFind(renderWith(props), 'div > div.alert-danger').length).toBe(0);
    });

    it('should call onChange', () => {
        const input = enzymeHelper.findSingle(renderWith(props), 'div > input');
        input.simulate('change');
        expect(onChangeWasCalled).toBe(true);
    });

    it('should render an error message when there is an error', () => {
        props.error = 'test error message';
        const errorDiv = enzymeHelper.findSingle(renderWith(props), 'div > div.alert-danger');

        expect(errorDiv.hasClass('alert'));
        expect(errorDiv.text()).toBe(props.error);
    });

    props = initializeProps();
    [
        { name: 'type', value: 'text' },
        { name: 'name', value: props.name },
        { name: 'className', value: 'form-control' },
        { name: 'placeholder', value: props.placeholder },
        { name: 'value', value: props.value }
    ]
    .forEach(scenario => {
        const input = enzymeHelper.findSingle(renderWith(props), 'div > input');
        it(`should render an "input" element with the expected ${scenario.name} attribute value`, () => {
            expect(input.props()[scenario.name]).toBe(scenario.value);
        });
    });
});
