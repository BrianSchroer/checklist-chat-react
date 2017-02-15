import React from 'react';
import {expect, shallow, enzymeHelper} from '../../../util/testHelpers';
import SimpleSelectInput from './SimpleSelectInput';

const defaultProps = {
    name: 'TestName',
    value: 'TestValue',
    options: [],
    onChange: () => { }
};

function render(propOverrides = {}) {
    const props = Object.assign({}, defaultProps, propOverrides);
    return shallow(<SimpleSelectInput {...props} />);
}

describe('SimpleSelectInput', () => {

    it('should call onChange when changed', () => {
        let onChangeWasCalled = false;

        const select = enzymeHelper.findSingle(
            render({ onChange: () => onChangeWasCalled = true }),
            'select');

        select.simulate('change');
        expect(onChangeWasCalled).toBe(true);
    });

    it('should not call onChange when not changed', () => {
        let onChangeWasCalled = false;

        enzymeHelper.findSingle(render({ onChange: () => onChangeWasCalled = true }), 'select');

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

        const actualOptions = enzymeHelper.find(render({ options }), 'select > option');

        expect(actualOptions.length).toBe(3);
    });

    [null, undefined, 0, 3, 5, 10].forEach(size => {
        const shouldRenderSizeAttribute = (size) ? true : false;

        it(`should ${(shouldRenderSizeAttribute) ? '' : 'not '}render "size" attribute for size: ${size}`, () => {
            const rendered = (shouldRenderSizeAttribute) ? render({size}) : render();
            const select = enzymeHelper.findSingle(rendered, 'select');

            if (shouldRenderSizeAttribute) {
                expect(select.props()['size']).toEqual(size);
            } else {
                expect(select.props()[size]).toBe(undefined);
            }
        });
    });
});
