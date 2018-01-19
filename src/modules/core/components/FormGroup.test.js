import React from 'react';
import { EnzymeHelper } from '../../../util/testHelpers';
import FormGroup from './FormGroup';

describe('FormGroup', () => {
  const formGroup = (
    <FormGroup name="TestName" label="TestLabel" error={null} children={[]} />
  );

  const enzymeHelper = new EnzymeHelper(formGroup);

  it('should render div with "form-group" class when there is no error', () => {
    enzymeHelper.shallow({ error: null });
    const div = enzymeHelper.find('div').first();
    expect(div.hasClass('form-group'));
    expect(div.hasClass('has-error')).toBe(false);
  });

  it('should render div with "form-group" and "has-error" classes when there is an error', () => {
    enzymeHelper.shallow({ error: 'test error message' });
    const div = enzymeHelper.find('div').first();
    expect(div.hasClass('form-group'));
    expect(div.hasClass('has-error'));
  });

  it('should render a label with expected attributes', () => {
    enzymeHelper.shallow();
    const label = enzymeHelper.findSingle('div > label');
    expect(label.props().htmlFor).toBe(formGroup.props.name);
    expect(label.text()).toBe(formGroup.props.label);
  });

  it('should render div.field containing children', () => {
    const testChildren = ['child1', 'child2'];

    enzymeHelper.shallow({ children: testChildren });

    const fieldDiv = enzymeHelper.findSingle('div > div.field');

    const actualChildren = fieldDiv.props().children;
    expect(actualChildren.length).toBeGreaterThan(0);
    expect(actualChildren[0]).toBe(testChildren);
  });

  it('should not render an error message when there is no error', () => {
    enzymeHelper.shallow({ error: '' });
    enzymeHelper.assertNoMatch('div > div.alert-danger');
  });

  it('should render an error message when there is an error', () => {
    const errorMessage = 'test error message';
    enzymeHelper.shallow({ error: errorMessage });
    const errorDiv = enzymeHelper.findSingle('div > div.alert-danger');

    expect(errorDiv.hasClass('alert'));
    expect(errorDiv.text()).toBe(errorMessage);
  });
});
