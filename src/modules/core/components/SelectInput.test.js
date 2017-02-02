import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import enzymeHelper from '../../../util/enzymeHelper';
import SelectInput from './SelectInput';

const defaultProps = {
    name: 'TestName',
    label: 'TestLabel',
    value: 'TestValue',
    error: 'TestError',
    size: 5,
    multiple: true,
    options: [],
    onChange: () => {}
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<SelectInput {...props} />);
}

describe('SelectInput', () => {
    ['name', 'label', 'error'].forEach(prop => {
        it(`should render a FormGroup with the expected "${prop}" prop`, () => {
            const formGroup = enzymeHelper.findSingle(render(), 'FormGroup');
            expect(formGroup.props()[prop]).toBe(defaultProps[prop]);
        });
    });

    ['name', 'value', 'options', 'size', 'multiple', 'onChange'].forEach(prop => {
        it(`should render a SimpleSelectInput with the expected "${prop}" prop`, () => {
            const node = enzymeHelper.findSingle(render(), 'FormGroup > SimpleSelectInput');
            expect(node.props()[prop]).toBe(defaultProps[prop]);
        });
    });

    it('should call onChange when changed', () => {
        let onChangeWasCalled = false;

        const select = enzymeHelper.findSingle(
            render({ onChange: () => onChangeWasCalled = true }),
            'FormGroup > SimpleSelectInput');

        select.simulate('change');
        expect(onChangeWasCalled).toBe(true);
    });
});
