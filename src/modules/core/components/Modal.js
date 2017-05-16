import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({title, formId, onSubmit, onCloseRequest, children, buttons}) => {
    const formAttributes = {
        onSubmit: (onSubmit)
            ? onSubmit
            : (event) => event.preventDefault()
    };

    if (formId) {
        formAttributes.id = formId;
    }

    return (
        <div className="checklist-chat-modal-backdrop" tabIndex="-1" role="dialog">
            <div className="modal-dialog checklist-chat-modal-dialog" role="document">
                <div className="modal-content">
                    <form {...formAttributes}>
                        <div className="modal-header bg-primary text-white">
                            <button type="button" className="close" aria-label="Close" onClick={onCloseRequest}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title display-linebreaks">{title}</h4>
                        </div>
                        <div className="modal-body">{children}</div>
                        {buttons && <div className="modal-footer">{buttons}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    formId: PropTypes.string,
    onCloseRequest: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    children: PropTypes.node.isRequired,
    buttons: PropTypes.node
};

export default Modal;
