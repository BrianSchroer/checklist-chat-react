import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import TextInput from './TextInput';

storiesOf('TextInput', module)
    .add('single line "TextBox" with placeholder', () => (
        <div className="storybook-frame">
            <TextInput label="label" name="testName" placeholder="placeholder"
                onChange={action('onChange')} error="" />
        </div>
    ))
    .add('single line "TextBox" with value', () => (
        <div className="storybook-frame">
            <TextInput label="label" name="testName" placeholder="placeholder"
                onChange={action('onChange')} value="value" error="" />
        </div>
    ))
    .add('single line "TextBox" with error', () => (
        <div className="storybook-frame">
            <TextInput label="label" name="testName" placeholder="placeholder"
                onChange={action('onChange')} value="value" error="Error message" />
        </div>
    ))
    .add('textarea with placeholder', () => (
        <div className="storybook-frame">
            <TextInput label="label" name="testName" placeholder="placeholder"
                onChange={action('onChange')} error="" rows="3" />
        </div>
    ))
    .add('textarea with value', () => (
        <div className="storybook-frame">
            <TextInput label="label" name="testName" placeholder="placeholder"
                onChange={action('onChange')} value="value" error="" rows="3" />
        </div>
    ))
    .add('textarea with error', () => (
        <div className="storybook-frame">
            <TextInput label="label" name="testName" placeholder="placeholder"
                onChange={action('onChange')} value="value" error="Error message" rows="3" />
        </div>
    ));
