import React from 'react';
import { storybookStories, action } from '../../../../tools/storybook';
import SimpleTextInput from './SimpleTextInput';

storybookStories('SimpleTextInput')
  .add('single line "TextBox" with placeholder', () => (
    <SimpleTextInput
      name="testName"
      placeholder="placeholder"
      onChange={action('onChange')}
    />
  ))
  .add('single line "TextBox" with value', () => (
    <SimpleTextInput
      name="testName"
      placeholder="placeholder"
      value="value"
      onChange={action('onChange')}
    />
  ))
  .add('textarea with placeholder', () => (
    <SimpleTextInput
      name="testName"
      rows={3}
      placeholder="placeholder"
      onChange={action('onChange')}
    />
  ))
  .add('textarea with value', () => (
    <SimpleTextInput
      name="testName"
      rows={3}
      placeholder="placeholder"
      value="value"
      onChange={action('onChange')}
    />
  ));
