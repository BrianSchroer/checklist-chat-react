import React, {PropTypes} from 'react';

const ModalContainer = ({title, onCloseRequest, children}) => {
    return (
        <div className="checklist-chat-modal-backdrop" tabIndex="-1" role="dialog">
            <div className="modal-dialog checklist-chat-modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <button type="button" className="close" aria-label="Close" onClick={onCloseRequest}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title display-linebreaks">{title}</h4>
                    </div>

                    {children}

                </div>
            </div>
        </div>
    );
};

ModalContainer.propTypes = {
    title: PropTypes.string,
    onCloseRequest: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalContainer;
