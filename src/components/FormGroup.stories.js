import React from 'react';
import {storiesOf} from '@kadira/storybook';
import FormGroup from './FormGroup';

storiesOf('FormGroup', module)
    .add('without error', () => (
         <div className="storybook-frame">
            <FormGroup label="label" name="testName" error="">
                <p>(input children)</p>
            </FormGroup>
        </div>
    ))
    .add('with error', () => (
        <div className="storybook-frame">
            <FormGroup label="label" name="testName" error="error message">
                <p>(input children)</p>
            </FormGroup>
        </div>
    ));
