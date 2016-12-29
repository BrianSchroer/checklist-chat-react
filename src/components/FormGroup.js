// form label, input, error message

import React, {PropTypes} from 'react';

const FormGroup = ({name, label, error, children}) => {
    const wrapperClass =
        (error && error.length > 0) ? 'form-group has-error' : 'form-group';

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                {children}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

FormGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default FormGroup;
