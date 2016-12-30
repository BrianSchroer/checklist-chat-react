import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import SimpleSelectInput from './SimpleSelectInput';
import enzymeHelper from '../util/enzymeHelper';

const defaultProps = {
    name: 'TestName',
    value: 'TestValue',
    options: [],
    onChange: () => {}
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<SimpleSelectInput {...props}/>);
}

describe('SimpleSelectInput', () => {

    it('should call onChange when changed', () => {
        let onChangeWasCalled = false;

        const select = enzymeHelper.findSingle(
            render({onChange: () => onChangeWasCalled = true}),
            'select');

        select.simulate('change');
        expect(onChangeWasCalled).toBe(true);
    });

    it('should not call onChange when not changed', () => {
        let onChangeWasCalled = false;

        enzymeHelper.findSingle(render({onChange: () => onChangeWasCalled = true}), 'select');

        expect(onChangeWasCalled).toBe(false);
    });

    [
        { name: 'name', value: defaultProps.name },
        { name: 'value', value: defaultProps.value },
        { name: 'className', value: 'form-control' }
    ]
    .forEach(scenario => {
        const select = enzymeHelper.findSingle(render(), 'select');
        it(`should render a "select" element with the expected "${scenario.name}" attribute value`, () => {
            expect(select.props()[scenario.name]).toBe(scenario.value);
        });
    });

    it('should render expected select > option elements', () => {
        const options = [
            { value: 'Value1', text: 'Text 1' },
            { value: 'Value2', text: 'Text 2' },
            { value: 'Value3', text: 'Text 3' }
        ];

        const actualOptions = enzymeHelper.nestedFind(render({options}), 'select > option');

        expect(actualOptions.length).toBe(3);
   });
});
