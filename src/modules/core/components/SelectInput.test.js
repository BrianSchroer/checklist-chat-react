import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import SelectInput from './SelectInput';

function dummyFunction() {}

describe('SelectInput', () => {
  const selectInput = (
    <SelectInput
      name="TestName"
      label="TestLabel"
      value="TestValue"
      error="TestError"
      size={5}
      multiple
      options={[]}
      onChange={dummyFunction}
    />
  );

  const defaultProps = selectInput.props;
  const enzymeHelper = new EnzymeHelper(selectInput);

  ['name', 'label', 'error'].forEach(prop => {
    it(`should render a FormGroup with the expected "${prop}" prop`, () => {
      enzymeHelper.shallow();
      const formGroup = enzymeHelper.findSingle('FormGroup');
      expect(formGroup.props()[prop]).toBe(defaultProps[prop]);
    });
  });

  ['name', 'value', 'options', 'size', 'multiple', 'onChange'].forEach(prop => {
    it(`should render a SimpleSelectInput with the expected "${prop}" prop`, () => {
      enzymeHelper.shallow();
      const node = enzymeHelper.findSingle('FormGroup > SimpleSelectInput');
      expect(node.props()[prop]).toBe(defaultProps[prop]);
    });
  });

  it('should call onChange when changed', () => {
    let onChangeWasCalled = false;

    enzymeHelper.shallow({ onChange: () => (onChangeWasCalled = true) });
    const select = enzymeHelper.findSingle('FormGroup > SimpleSelectInput');

    select.simulate('change');
    expect(onChangeWasCalled).toBe(true);
  });
});
