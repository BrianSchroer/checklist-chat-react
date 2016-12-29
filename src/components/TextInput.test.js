import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import TextInput from './TextInput';
import enzymeHelper from '../util/enzymeHelper';

const defaultProps = {
    name: 'TestName',
    label: 'TestLabel',
    error: 'TestError',
    placeholder: 'TestPlaceholder',
    value: 'TestValue',
    onChange: () => {}
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<TextInput {...props}/>);
}

describe('TextInput', () => {
    [
        { name: 'name', value: defaultProps.name },
        { name: 'label', value: defaultProps.label },
        { name: 'error', value: defaultProps.error }
    ]
    .forEach(scenario => {
        const input = enzymeHelper.findSingle(render(), 'FormGroup');
        it(`should render a "FormGroup" element with the expected ${scenario.name} attribute value`, () => {
            expect(input.props()[scenario.name]).toBe(scenario.value);
        });
    });

    [
        { name: 'name', value: defaultProps.name },
        { name: 'placeholder', value: defaultProps.placeholder },
        { name: 'value', value: defaultProps.value },
        { name: 'onChange', value: defaultProps.onChange }
    ]
    .forEach(scenario => {
        const input = enzymeHelper.findSingle(render(), 'FormGroup > SimpleTextInput');
        it(`should render a "SimpleTextInput" element with the expected ${scenario.name} attribute value`, () => {
            expect(input.props()[scenario.name]).toBe(scenario.value);
        });
    });
});
