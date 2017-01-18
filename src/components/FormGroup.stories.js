import React from 'react';
import {storiesOf} from '@kadira/storybook';
import storyFrameDecorator from '../../tools/storybook/storyFrameDecorator';
import FormGroup from './FormGroup';

storiesOf('FormGroup', module)
    .addDecorator(storyFrameDecorator)

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
