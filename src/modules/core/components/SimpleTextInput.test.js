import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import SimpleTextInput from './SimpleTextInput';

function dummyFunction() {}

describe('SimpleTextInput', () => {
  const simpleTextInput = (
    <SimpleTextInput
      name="TestName"
      placeholder="TestPlaceholder"
      value="TestValue"
      onChange={dummyFunction}
    />
  );

  const defaultProps = simpleTextInput.props;
  const enzymeHelper = new EnzymeHelper(simpleTextInput);

  it('should call onChange when changed', () => {
    let onChangeWasCalled = false;

    enzymeHelper.shallow({ onChange: () => (onChangeWasCalled = true) });
    const input = enzymeHelper.findSingle('input');

    input.simulate('change');
    expect(onChangeWasCalled).toBe(true);
  });

  it('should not call onChange when not changed', () => {
    let onChangeWasCalled = false;

    enzymeHelper.shallow({ onChange: () => (onChangeWasCalled = true) });

    expect(onChangeWasCalled).toBe(false);
  });

  [
    { name: 'type', value: 'text' },
    { name: 'name', value: defaultProps.name },
    { name: 'className', value: 'form-control' },
    { name: 'placeholder', value: defaultProps.placeholder },
    { name: 'value', value: defaultProps.value }
  ].forEach(scenario => {
    enzymeHelper.shallow();
    const input = enzymeHelper.findSingle('input');
    it(`should render an "input" element with the expected "${
      scenario.name
    }" attribute value`, () => {
      expect(input.props()[scenario.name]).toBe(scenario.value);
    });
  });

  [0, 1].forEach(rows => {
    it(`should render an "input" element when rows = ${rows}`, () => {
      enzymeHelper.shallow({ rows });
      const input = enzymeHelper.findSingle('input');
      expect(input.props()['value']).toEqual(defaultProps.value);
    });
  });

  [2, 3, 10].forEach(rows => {
    it(`should render a "textarea" element when rows = ${rows}`, () => {
      enzymeHelper.shallow({ rows });
      const textarea = enzymeHelper.findSingle('textarea');
      expect(textarea.props()['rows']).toBe(rows);
      expect(textarea.props()['value']).toEqual(defaultProps.value);
    });
  });
});
