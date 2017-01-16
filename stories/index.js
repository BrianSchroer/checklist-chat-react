import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Welcome from './Welcome';
import Button from './Button';
import PlannedVsActual from '../src/components/PlannedVsActual';
import SimpleTextInput from '../src/components/SimpleTextInput';
import TextInput from '../src/components/TextInput';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('PlannedVsActual', module)
    .add('when planned = actual', () => (
        <PlannedVsActual planned="planned" actual="planned" />
    ))
    .add('when planned != actual', () => (
        <PlannedVsActual planned="planned" actual="actual" />
    ));

storiesOf('SimpleTextInput', module)
    .add('single line "TextBox" with placeholder', () => (
        <SimpleTextInput name="testName" placeholder="placeholder"
            onChange={action('onChange')} />
    ))
    .add('single line "TextBox" with value', () => (
        <SimpleTextInput name="testName" placeholder="placeholder"
            value="value" onChange={action('onChange')} />
    ))
    .add('textarea with placeholder', () => (
        <SimpleTextInput name="testName" rows="3" placeholder="placeholder"
            onChange={action('onChange')} />
    ))
    .add('textarea with value', () => (
        <SimpleTextInput name="testName" rows="3" placeholder="placeholder"
            value="value" onChange={action('onChange')} />
    ));

storiesOf('TextInput', module)
    .add('single line "TextBox" with placeholder', () => (
        <TextInput label="label" name="testName" placeholder="placeholder"
            onChange={action('onChange')} error="" />
    ))
    .add('single line "TextBox" with value', () => (
        <TextInput label="label" name="testName" placeholder="placeholder"
            onChange={action('onChange')} value="value" error="" />
    ))
    .add('single line "TextBox" with error', () => (
        <TextInput label="label" name="testName" placeholder="placeholder"
            onChange={action('onChange')} value="value" error="Error message" />
    ))
    .add('textarea with placeholder', () => (
        <TextInput label="label" name="testName" placeholder="placeholder"
            onChange={action('onChange')} error="" rows="3" />
    ))
    .add('textarea with value', () => (
        <TextInput label="label" name="testName" placeholder="placeholder"
            onChange={action('onChange')} value="value" error="" rows="3" />
    ))
    .add('textarea with error', () => (
        <TextInput label="label" name="testName" placeholder="placeholder"
            onChange={action('onChange')} value="value" error="Error message" rows="3" />
    ));
