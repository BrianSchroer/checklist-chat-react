import React from 'react';
import{shallow, enzymeHelper} from '../../../util/testHelpers';
import SimpleTextInput from './SimpleTextInput';

const defaultProps = {
    name: 'TestName',
    placeholder: 'TestPlaceholder',
    value: 'TestValue',
    onChange: () => {}
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<SimpleTextInput {...props}/>);
}

describe('SimpleTextInput', () => {

    it('should call onChange when changed', () => {
        let onChangeWasCalled = false;

        const input = enzymeHelper.findSingle(
            render({onChange: () => onChangeWasCalled = true}),
            'input');

        input.simulate('change');
        expect(onChangeWasCalled).toBe(true);
    });

    it('should not call onChange when not changed', () => {
        let onChangeWasCalled = false;

        enzymeHelper.findSingle(render({onChange: () => onChangeWasCalled = true}), 'input');

        expect(onChangeWasCalled).toBe(false);
    });

    [
        { name: 'type', value: 'text' },
        { name: 'name', value: defaultProps.name },
        { name: 'className', value: 'form-control' },
        { name: 'placeholder', value: defaultProps.placeholder },
        { name: 'value', value: defaultProps.value }
    ]
    .forEach(scenario => {
        const input = enzymeHelper.findSingle(render(), 'input');
        it(`should render an "input" element with the expected "${scenario.name}" attribute value`, () => {
            expect(input.props()[scenario.name]).toBe(scenario.value);
        });
    });

    [0, 1].forEach(rows => {
        it(`should render an "input" element when rows = ${rows}`, () => {
            const input = enzymeHelper.findSingle(render({rows}), 'input');
            expect(input.props()['value']).toEqual(defaultProps.value);
        });
    });

    [2, 3, 10].forEach(rows => {
        it(`should render a "textarea" element when rows = ${rows}`, () => {
            const textarea = enzymeHelper.findSingle(render({rows}), 'textarea');
            expect(textarea.props()['rows']).toBe(rows);
            expect(textarea.props()['value']).toEqual(defaultProps.value);
        });
    });
});
