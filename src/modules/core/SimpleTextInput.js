import React, {PropTypes} from 'react';

/**
 * Standalone (without accompanying label/error) text input
 * ('input type="text"' or 'textarea' HTML element) component.
 * @param {string} name - The name for the HTML element
 * @param {string} [placeholder] - (Optional) placeholder value for the HTML element
 * @param {string} [value] - (Optional) HTML element value
 * @param {number} [rows] - (Optional) Number of rows for the input (if > 1, textArea is rendered; othwerise: input)
 * @param {func} onChange - Callback function to handle HTML element change event
 * @returns {object} input type="text"' or 'textarea' HTML element
 * @module SimpleTextInput
 * @see module:TextInput
 */
const SimpleTextInput = ({name, placeholder, value, rows, onChange}) => {
    let Tag;
    const optionalAttributes = {};

    if (rows && rows > 1) {
        Tag = 'textarea';
        optionalAttributes.rows = rows;
    } else {
        Tag = 'input';
        optionalAttributes.type = 'text';
    }

    return (
        <Tag name={name} className="form-control"
            {...optionalAttributes}
            placeholder={placeholder} value={value || ''}
            onChange={onChange} />
    );
};

SimpleTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

export default SimpleTextInput;
