import React from 'react';
import { storiesOf, action } from '@storybook/react';
import {
  storybookFrameDecorator,
  withInfoDecorator
} from '../../../../tools/storybook';
import TextInput from './TextInput';

storiesOf('TextInput', module)
  .addDecorator(withInfoDecorator)
  .addDecorator(storybookFrameDecorator)
  .add('single line "TextBox" with placeholder', () => (
    <TextInput
      label="label"
      name="testName"
      placeholder="placeholder"
      onChange={action('onChange')}
      error=""
    />
  ))
  .add('single line "TextBox" with value', () => (
    <TextInput
      label="label"
      name="testName"
      placeholder="placeholder"
      onChange={action('onChange')}
      value="value"
      error=""
    />
  ))
  .add('single line "TextBox" with error', () => (
    <TextInput
      label="label"
      name="testName"
      placeholder="placeholder"
      onChange={action('onChange')}
      value="value"
      error="Error message"
    />
  ))
  .add('textarea with placeholder', () => (
    <TextInput
      label="label"
      name="testName"
      placeholder="placeholder"
      onChange={action('onChange')}
      error=""
      rows={3}
    />
  ))
  .add('textarea with value', () => (
    <TextInput
      label="label"
      name="testName"
      placeholder="placeholder"
      onChange={action('onChange')}
      value="value"
      error=""
      rows={3}
    />
  ))
  .add('textarea with error', () => (
    <TextInput
      label="label"
      name="testName"
      placeholder="placeholder"
      onChange={action('onChange')}
      value="value"
      error="Error message"
      rows={3}
    />
  ));
