import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SimpleTextInput from './SimpleTextInput';
import storyFrameDecorator from '../../../tools/storybook/storyFrameDecorator';

storiesOf('SimpleTextInput', module)
    .addDecorator(storyFrameDecorator)

    .add('single line "TextBox" with placeholder', () => (
        <SimpleTextInput name="testName" placeholder="placeholder"
            onChange={action('onChange')} />
    ))

    .add('single line "TextBox" with value', () => (
        <SimpleTextInput name="testName" placeholder="placeholder"
            value="value" onChange={action('onChange')} />
    ))

    .add('textarea with placeholder', () => (
        <SimpleTextInput name="testName" rows={3} placeholder="placeholder"
            onChange={action('onChange')} />
    ))

    .add('textarea with value', () => (
        <SimpleTextInput name="testName" rows={3} placeholder="placeholder"
            value="value" onChange={action('onChange')} />
    ));
