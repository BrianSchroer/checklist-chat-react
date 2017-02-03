import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {storybookFrameDecorator} from '../../../../tools/storybook';
import SelectInput from './SelectInput';

const options = [
    { value: 'Value1', text: 'Text 1' },
    { value: 'Value2', text: 'Text 2' },
    { value: 'Value3', text: 'Text 3' }
];

storiesOf('SelectInput', module)
    .addDecorator(storybookFrameDecorator)

    .add('dropdown - no value selected', () => (
        <SelectInput
            name="name" label="label"
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('dropdown - value 2 selected', () => (
        <SelectInput
            name="name" label="label"
            value="Value2"
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('dropdown with error', () => (
        <SelectInput
            name="name" label="label"
            error="Bad choice!"
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('listbox - no value selected', () => (
        <SelectInput
            name="name" label="label"
            size={3}
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('listbox - value 2 selected', () => (
        <SelectInput
            name="name" label="label"
            size={3}
            value="Value2"
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ))

    .add('listbox - multiselect', () => (
        <SelectInput
            name="name" label="label"
            size={3}
            options={options}
            multiple
            onChange={action('onChange')} />
    ))

    .add('listbox with error', () => (
        <SelectInput
            name="name" label="label"
            size={3}
            error="Make up your mind!"
            options={options}
            multiple={false}
            onChange={action('onChange')} />
    ));
