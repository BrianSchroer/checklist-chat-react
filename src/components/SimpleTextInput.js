import React, {PropTypes} from 'react';

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
