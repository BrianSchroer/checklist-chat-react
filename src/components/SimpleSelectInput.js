import React, {PropTypes} from 'react';

const SelectInput = ({name, value, options, onChange}) => {
    return (
        <select
            name={name}
            value={value}
            className="form-control"
            onChange={onChange}
        >
            {
                options.map(option => {
                    return <option key={option.value} value={option.value}>{option.text}</option>;
                })
            }
        </select>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired
};

export default SelectInput;