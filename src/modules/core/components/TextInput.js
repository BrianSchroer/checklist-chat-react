import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import SimpleTextInput from './SimpleTextInput';

/**
 * Text input ('input type="text"' or 'textarea' HTML element) component, with label and error message.
 * @param {string} name - The name for the HTML element
 * @param {string} label - Label text
 * @param {string} [error] - (Optional) error message
 * @param {string} [placeholder] - (Optional) placeholder value for the HTML element
 * @param {number} [rows] - (Optional) Number of rows for the input (if > 1, textArea is rendered; othwerise: input)
 * @param {string} [value] - (Optional) HTML element value
 * @param {func} onChange - Callback function to handle HTML element change event
 * @returns {object} input type="text"' or 'textarea' HTML element
 * @module TextInput
 * @see module:SimpleTextInput
 */
const TextInput = ({name, label, error, placeholder, rows, value, onChange}) => {
    return (
        <FormGroup name={name} label={label} error={error}>
            <SimpleTextInput name={name} placeholder={placeholder} value={value}
                rows={rows}
                onChange={onChange} />
        </FormGroup>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default TextInput;
