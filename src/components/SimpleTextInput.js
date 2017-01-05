import React, {PropTypes} from 'react';

const SimpleTextInput = ({name, placeholder, value, rows, onChange}) => {
    if (rows && rows > 1) {
        return (
            <textarea name={name} className="form-control"
                placeholder={placeholder} rows={rows}
                onChange={onChange}>
            {value}
            </textarea>
        );
    } else {
        return (
            <input type="text" name={name} className="form-control"
                placeholder={placeholder} value={value || ''}
                onChange={onChange} />
        );
    }
};

SimpleTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

export default SimpleTextInput;
