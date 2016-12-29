import React, {PropTypes} from 'react';

const SimpleTextInput = ({name, placeholder, value, onChange}) => {
    return (
        <input
            type="text"
            name={name}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

SimpleTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default SimpleTextInput;
