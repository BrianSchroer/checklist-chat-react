import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, defaultValue, value, error, options}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <select
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    className="form-control"
                    onChange={onChange}>
                    {
                        options.map(option => {
                            return <option key={option.value} value={option.value}>{option.text}</option>;
                        })
                    }
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
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
