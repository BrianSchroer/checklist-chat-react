import React, {PropTypes} from 'react';

/**
 * Standalone (without accompanying label/error) select/options HTML component.
 * @param {string} name - The name for the HTML element
 * @param {string} [value] - (Optional) Selected value
 * @param {object[]} options - Array of objects, each with "value" and "text" properties
 * @param {number} [size] - (Optional) Number of "rows" to display,
 *      if "select" element is "list box" rather than "dropdown"
 * @param {bool} [multiple] - Are multiple selections allowed?
 * @returns {object} HTML "select" element, with "option" children
 * @module SimpleSelectInput
 * @see module:SelectInput
 */
const SimpleSelectInput = ({name, value, options, size, multiple, onChange}) => {
    const optionalAttributes = {};

    if (size) {
        optionalAttributes.size = size;
    }

    if (multiple) {
        optionalAttributes.multiple = 'multiple';
    }

    return (
        <select name={name} value={value} className="form-control" onChange={onChange}
            {...optionalAttributes}>
        {
            options.map(option => {
                return <option key={option.value} value={option.value}>{option.text}</option>;
            })
        }
        </select>
    );
};

SimpleSelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    size: PropTypes.number,
    multiple: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export default SimpleSelectInput;
