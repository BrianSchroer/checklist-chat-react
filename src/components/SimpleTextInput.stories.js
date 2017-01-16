import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import SimpleTextInput from './SimpleTextInput';

storiesOf('SimpleTextInput', module)
    .add('single line "TextBox" with placeholder', () => (
        <div className="storybook-frame">
            <SimpleTextInput name="testName" placeholder="placeholder"
                onChange={action('onChange')} />
        </div>
    ))
    .add('single line "TextBox" with value', () => (
        <div className="storybook-frame">
            <SimpleTextInput name="testName" placeholder="placeholder"
                value="value" onChange={action('onChange')} />
        </div>
    ))
    .add('textarea with placeholder', () => (
        <div className="storybook-frame">
            <SimpleTextInput name="testName" rows="3" placeholder="placeholder"
                onChange={action('onChange')} />
        </div>
    ))
    .add('textarea with value', () => (
        <div className="storybook-frame">
            <SimpleTextInput name="testName" rows="3" placeholder="placeholder"
                value="value" onChange={action('onChange')} />
        </div>
    ));
