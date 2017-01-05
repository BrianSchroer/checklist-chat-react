import React, {PropTypes} from 'react';
import FormGroup from './FormGroup';
import SimpleTextInput from './SimpleTextInput';

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
