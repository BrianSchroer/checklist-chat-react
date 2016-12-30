import React, {PropTypes} from 'react';
import FormGroup from './FormGroup';
import SimpleSelectInput from './SimpleSelectInput';

const SelectInput = ({name, label, onChange, value, error, options}) => {
    return (
        <FormGroup
            name={name}
            label={label}
            error={error}
        >
            <SimpleSelectInput
                name={name}
                value={value}
                options={options}
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
    options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
