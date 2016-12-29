import React, {PropTypes} from 'react';
import FormGroup from './FormGroup';
import SimpleSelectInput from './SimpleSelectInput';

const SelectInput = ({name, label, onChange, defaultValue, value, error, options}) => {
    return (
        <FormGroup
            name={name}
            label={label}
            error={error}
        >
            <SimpleSelectInput
                name={name}
                defaultValue={defaultValue}
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
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
