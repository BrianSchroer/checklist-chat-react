import React from 'react';
import {storiesOf} from '@storybook/react';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import FormGroup from './FormGroup';

storiesOf('FormGroup', module)
    .addDecorator(storybookFrameDecorator)

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
