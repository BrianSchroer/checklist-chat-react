import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import TextInput from './TextInput';

function dummyFunction() {}

describe('TextInput', () => {
  const textInput = (
    <TextInput
      name="TestName"
      label="TestLabel"
      error="TestError"
      placeholder="TestPlaceholder"
      value="TestValue"
      onChange={dummyFunction}
    />
  );

  const defaultProps = textInput.props;
  const enzymeHelper = new EnzymeHelper(textInput);

  [
    { name: 'name', value: defaultProps.name },
    { name: 'label', value: defaultProps.label },
    { name: 'error', value: defaultProps.error }
  ].forEach(scenario => {
    enzymeHelper.shallow();
    const input = enzymeHelper.findSingle('FormGroup');
    it(`should render a "FormGroup" element with the expected ${
      scenario.name
    } attribute value`, () => {
      expect(input.props()[scenario.name]).toBe(scenario.value);
    });
  });

  [
    { name: 'name', value: defaultProps.name },
    { name: 'placeholder', value: defaultProps.placeholder },
    { name: 'value', value: defaultProps.value },
    { name: 'onChange', value: defaultProps.onChange }
  ].forEach(scenario => {
    enzymeHelper.shallow();
    const input = enzymeHelper.findSingle('FormGroup > SimpleTextInput');
    it(`should render a "SimpleTextInput" element with the expected ${
      scenario.name
    } attribute value`, () => {
      expect(input.props()[scenario.name]).toBe(scenario.value);
    });
  });

  [0, 1, 3].forEach(rows => {
    it(`should render a "SimpleTextInput" element with the expected rows: ${rows}`, () => {
      enzymeHelper.shallow({ rows });
      const input = enzymeHelper.findSingle('FormGroup > SimpleTextInput');
      expect(input.props()['rows']).toBe(rows);
    });
  });

  it('should call onChange when changed', () => {
    let onChangeWasCalled = false;

    enzymeHelper.shallow({ onChange: () => (onChangeWasCalled = true) });
    const input = enzymeHelper.findSingle('FormGroup > SimpleTextInput');

    input.simulate('change');
    expect(onChangeWasCalled).toBe(true);
  });

  it('should not call onChange when not changed', () => {
    let onChangeWasCalled = false;

    enzymeHelper.shallow({ onChange: () => (onChangeWasCalled = true) });

    expect(onChangeWasCalled).toBe(false);
  });
});
