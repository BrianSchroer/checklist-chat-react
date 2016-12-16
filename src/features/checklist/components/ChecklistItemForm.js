import React, {PropTypes} from 'react';
import SelectInput from '../../../components/SelectInput';
import TextInput from '../../../components/TextInput';
import * as checklistItemStatus from '../checklistItemStatus';

const ChecklistItemForm = ({
        checklistItem, isSaving, isDeleting, shouldAllowDelete, errors,
        onChange, onSave, onDelete, onCancel}) => {

    return (
        <form>
            <SelectInput name="status" label="Status" value={checklistItem.status}
                onChange={onChange} error={errors.status}
                defaultOption={checklistItemStatus.NOT_STARTED}
                options={checklistItemStatus.options} />

            <TextInput name="description" label="Description" value={checklistItem.description}
                onChange={onChange} error={errors.description} />

            <div className="btn-toolbar">

                <input type="submit" disabled={isSaving || isDeleting}
                    value={isSaving ? 'Saving...' : 'Save'}
                    className="btn btn-success"
                    onClick={onSave}/>

                <input type="button"
                    value="Cancel"
                    className="btn btn-warning"
                    onClick={onCancel}/>
                {
                    shouldAllowDelete &&
                        <input type="button" disabled={isSaving || isDeleting}
                            value={isDeleting ? 'Deleting...' : 'Delete'}
                            className="btn btn-danger pull-right"
                            onClick={onDelete}/>
                }
            </div>
         </form>
    );
};

ChecklistItemForm.propTypes = {
    checklistItem: PropTypes.object.isRequired,
    isSaving: PropTypes.bool,
    isDeleting: PropTypes.bool,
    shouldAllowDelete: PropTypes.bool,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ChecklistItemForm;
