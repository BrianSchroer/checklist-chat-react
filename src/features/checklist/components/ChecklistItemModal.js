import React, {PropTypes} from 'react';
import TextInput from '../../../components/TextInput';

const ChecklistItemModal = ({checklistItem, isNewItem, errors, onChange, onSave, onCancel}) => {
    return (
        <div className="checklist-chat-modal-backdrop" tabIndex="-1" role="dialog">
            <div className="modal-dialog checklist-chat-modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" aria-label="Close" onClick={onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">
                            {(isNewItem) ? 'Create a new task..' : 'Edit Task'}
                        </h4>
                    </div>

                    <div className="modal-body">
                        <TextInput name="description" label="Description" value={checklistItem.description}
                            onChange={onChange} error={errors.description} />
                    </div>

                    <div className="modal-footer">
                        <input type="button" value="Cancel" className="btn btn-default" onClick={onCancel}/>
                        <input type="submit" value="Save" className="btn btn-primary" onClick={onSave}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

ChecklistItemModal.propTypes = {
    checklistItem: PropTypes.object.isRequired,
    isNewItem: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ChecklistItemModal;
