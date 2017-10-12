import React from 'react';
import { storybookStories } from '../../../../tools/storybook';
import FormGroup from './FormGroup';

storybookStories('FormGroup')
  .add('without error', () => (
    <FormGroup label="label" name="testName" error="">
      <p>{'(<children>)'}</p>
    </FormGroup>
  ))
  .add('with error', () => (
    <FormGroup label="label" name="testName" error="error message">
      <p>{'(<children>)'}</p>
    </FormGroup>
  ));
