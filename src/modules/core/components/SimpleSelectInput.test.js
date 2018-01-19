import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import SimpleSelectInput from './SimpleSelectInput';

function dummyFunction() {}

describe('SimpleSelectInput', () => {
  const simpleSelectInput = (
    <SimpleSelectInput
      name="TestName"
      value="TestValue"
      options={[]}
      onChange={dummyFunction}
    />
  );

  const defaultProps = simpleSelectInput.props;
  const enzymeHelper = new EnzymeHelper(simpleSelectInput);

  it('should call onChange when changed', () => {
    let onChangeWasCalled = false;

    enzymeHelper.shallow({ onChange: () => (onChangeWasCalled = true) });
    const select = enzymeHelper.findSingle('select');

    select.simulate('change');
    expect(onChangeWasCalled).toBe(true);
  });

  it('should not call onChange when not changed', () => {
    let onChangeWasCalled = false;

    enzymeHelper.shallow({ onChange: () => (onChangeWasCalled = true) });

    expect(onChangeWasCalled).toBe(false);
  });

  [
    { name: 'name', value: defaultProps.name },
    { name: 'value', value: defaultProps.value },
    { name: 'className', value: 'form-control' }
  ].forEach(scenario => {
    enzymeHelper.shallow();
    const select = enzymeHelper.findSingle('select');
    it(`should render a "select" element with the expected "${
      scenario.name
    }" attribute value`, () => {
      expect(select.props()[scenario.name]).toBe(scenario.value);
    });
  });

  it('should render expected select > option elements', () => {
    const options = [
      { value: 'Value1', text: 'Text 1' },
      { value: 'Value2', text: 'Text 2' },
      { value: 'Value3', text: 'Text 3' }
    ];

    enzymeHelper.shallow({ options });
    const actualOptions = enzymeHelper.find('select > option');

    expect(actualOptions.length).toBe(3);
  });

  [null, undefined, 0, 3, 5, 10].forEach(size => {
    const shouldRenderSizeAttribute = size ? true : false;

    it(`should ${
      shouldRenderSizeAttribute ? '' : 'not '
    }render "size" attribute for size: ${size}`, () => {
      if (shouldRenderSizeAttribute) {
        enzymeHelper.shallow({ size });
      } else {
        enzymeHelper.shallow();
      }

      const select = enzymeHelper.findSingle('select');

      if (shouldRenderSizeAttribute) {
        expect(select.props()['size']).toEqual(size);
      } else {
        expect(select.props()[size]).toBe(undefined);
      }
    });
  });
});
