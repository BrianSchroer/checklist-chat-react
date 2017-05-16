import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import SimpleSelectInput from './SimpleSelectInput';

/**
 * select/options HTML component with label and error message.
 * @param {string} name - The name for the HTML element
 * @param {string} label - Label text
 * @param {string} [error] - (Optional) error message
 * @param {string} [value] - (Optional) Selected value
 * @param {object[]} options - Array of objects, each with "value" and "text" properties
 * @param {number} [size] - (Optional) Number of "rows" to display,
 *      if "select" element is "list box" rather than "dropdown"
 * @param {bool} [multiple] - Are multiple selections allowed?
 * @returns {object} HTML "select" element, with "option" children
 * @module SelectInput
 * @see module:SimpleSelectInput
 */
const SelectInput = ({name, label, onChange, value, error, size, multiple, options}) => {
    return (
        <FormGroup name={name} label={label} error={error}>
            <SimpleSelectInput
                name={name}
                value={value}
                options={options}
                size={size}
                multiple={multiple}
                onChange={onChange}
            />
        </FormGroup>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    size: PropTypes.number,
    multiple: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
