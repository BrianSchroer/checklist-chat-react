import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import SimpleSelectInput from './SimpleSelectInput';

const options = [
    { value: 'Value1', text: 'Text 1' },
    { value: 'Value2', text: 'Text 2' },
    { value: 'Value3', text: 'Text 3' }
];

storiesOf('SimpleSelectInput', module)
    .addDecorator(storybookFrameDecorator)

    .add('dropdown - no value selected', () => (
        <SimpleSelectInput
            name="name"
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('dropdown - value 2 selected', () => (
        <SimpleSelectInput
            name="name"
            value="Value2"
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('listbox - no value selected', () => (
        <SimpleSelectInput
            name="name"
            size={3}
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('listbox - value 2 selected', () => (
        <SimpleSelectInput
            name="name"
            size={3}
            value="Value2"
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('listbox - multiselect', () => (
        <SimpleSelectInput
            name="name"
            size={3}
            options={options}
            multiple
            onChange={action('onChange')} />
    ));
