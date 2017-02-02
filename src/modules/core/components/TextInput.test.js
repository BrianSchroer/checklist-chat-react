import expect from 'expect';
import React from 'react';
import {shallow, enzymeHelper} from '../../../util/testHelpers';
import TextInput from './TextInput';

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

    [0, 1, 3].forEach(rows => {
        it(`should render a "SimpleTextInput" element with the expected rows: ${rows}`, () => {
            const input = enzymeHelper.findSingle(render({rows}), 'FormGroup > SimpleTextInput');
            expect(input.props()['rows']).toBe(rows);
        });
    });

    it('should call onChange when changed', () => {
        let onChangeWasCalled = false;

        const input = enzymeHelper.findSingle(
            render({ onChange: () => onChangeWasCalled = true }),
            'FormGroup > SimpleTextInput');

        input.simulate('change');
        expect(onChangeWasCalled).toBe(true);
    });

    it('should not call onChange when not changed', () => {
        let onChangeWasCalled = false;

        enzymeHelper.findSingle(
            render({ onChange: () => onChangeWasCalled = true }),
            'FormGroup > SimpleTextInput');

        expect(onChangeWasCalled).toBe(false);
    });
});
