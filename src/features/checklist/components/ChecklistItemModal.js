import React, {PropTypes} from 'react';
import SelectInput from '../../../components/SelectInput';
import TextInput from '../../../components/TextInput';
import format from '../../../util/format';
import * as checklistItemStatus from '../checklistItemStatus';
import ChecklistItemStatusIcon from './CheckllistItemStatusIcon';

const ChecklistItemModal = ({
        checklistItem,
        isNewChecklistItem,
        maxSequenceNumber,
        errors,
        onChange,
        onSave,
        onCancel}
    ) => {

    const sequenceNumberOptions = [...Array(maxSequenceNumber).keys()].map(i =>
    {
        const sequenceNumber = (i + 1).toString();
        return {value: sequenceNumber, text: sequenceNumber};
    });

    return (
        <div className="checklist-chat-modal-backdrop" tabIndex="-1" role="dialog">
            <div className="modal-dialog checklist-chat-modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" aria-label="Close" onClick={onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">
                            {(isNewChecklistItem) ? 'Create a new checklist item..' : 'Edit Checklist Item'}
                        </h4>
                    </div>

                    <div className="modal-body">
                        <div className="checklist-form-sequence-number-row">
                            <SelectInput name="sequenceNumber" label="Sequence Number"
                                options={sequenceNumberOptions}
                                defaultValue={checklistItem.sequenceNumber.toString()}
                                value={checklistItem.sequenceNumber.toString()}
                                onChange={onChange} error={errors.sequenceNumber} />
                        </div>
                        <div className="checklist-form-status-row">
                            <SelectInput name="status" label="Status"
                                options={checklistItemStatus.options}
                                defaultValue={checklistItem.status}
                                value={checklistItem.status}
                                onChange={onChange} error={errors.status} />
                            <div className="checklist-form-status-icon">
                                <ChecklistItemStatusIcon status={checklistItem.status}/>
                            </div>
                        </div>
                        <TextInput name="description" label="Description" value={checklistItem.description}
                            onChange={onChange} error={errors.description} />
                        <div className="checklist-form-timestamps">
                            <TextInput name="scheduledStartTime" label="Start Time: Scheduled"
                                value={format.time(checklistItem.scheduledStartTime)}
                                onChange={onChange} error={errors.scheduledStartTime} />
                            &nbsp;
                            <TextInput name="actualStartTime" label="Actual"
                                value={format.time(checklistItem.actualStartTime)}
                                onChange={onChange} error={errors.actualStartTime} />
                        </div>
                        <div className="checklist-form-timestamps">
                            <TextInput name="scheduledEndTime" label="End Time: Scheduled"
                                value={format.time(checklistItem.scheduledEndTime)}
                                onChange={onChange} error={errors.scheduledEndTime} />
                            &nbsp;
                            <TextInput name="actualEndTime" label="Actual"
                                value={format.time(checklistItem.actualEndTime)}
                                onChange={onChange} error={errors.actualEndTime} />
                        </div>
                        <TextInput name="userName" label="User Name" value={checklistItem.userName}
                            onChange={onChange} error={errors.userName} />
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
    isNewChecklistItem: PropTypes.bool.isRequired,
    maxSequenceNumber: PropTypes.number.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ChecklistItemModal;
