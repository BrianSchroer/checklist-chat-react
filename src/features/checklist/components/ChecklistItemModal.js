import React, {PropTypes} from 'react';
import FormGroup from '../../../components/FormGroup';
import SimpleSelectInput from '../../../components/SimpleSelectInput';
import ModalContainer from '../../../components/ModalContainer';
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
        <ModalContainer
            title={(isNewChecklistItem) ? 'Add New Checklist Item' : 'Edit Checklist Item'}
            onCloseRequest={onCancel}>

            <div className="modal-body">
                <div className="checklist-form-sequence-number-row">
                    <SelectInput name="sequenceNumber" label="Sequence Number"
                        options={sequenceNumberOptions}
                        value={checklistItem.sequenceNumber.toString()}
                        onChange={onChange} error={errors.sequenceNumber} />
                </div>

                <div className="checklist-form-status-row">
                    <FormGroup name="status" label="Status" error={errors.status}>
                        <div className="checklist-form-status-and-dropdown">
                                <div className="form-control checklist-form-status-div">
                                <ChecklistItemStatusIcon status={checklistItem.status}/>
                            </div>
                            <SimpleSelectInput
                                name="status"
                                value={checklistItem.status}
                                options={checklistItemStatus.options}
                                onChange={onChange} />
                        </div>
                    </FormGroup>
                </div>

                <TextInput name="description" label="Description" value={checklistItem.description}
                    onChange={onChange} error={errors.description} />

                <div className="checklist-form-timestamps">
                    <TextInput name="scheduledStartTime" label="Start Time: Scheduled"
                        value={format.time(checklistItem.scheduledStartTime)}
                        onChange={onChange} error={errors.scheduledStartTime} />
                    <TextInput name="actualStartTime" label="Actual"
                        value={format.time(checklistItem.actualStartTime)}
                        onChange={onChange} error={errors.actualStartTime} />
                </div>

                <div className="checklist-form-timestamps">
                    <TextInput name="scheduledEndTime" label="End Time: Scheduled"
                        value={format.time(checklistItem.scheduledEndTime)}
                        onChange={onChange} error={errors.scheduledEndTime} />
                    <TextInput name="actualEndTime" label="Actual"
                        value={format.time(checklistItem.actualEndTime)}
                        onChange={onChange} error={errors.actualEndTime} />
                </div>

                <TextInput name="userName" label="Performed by" value={checklistItem.userName}
                    onChange={onChange} error={errors.userName} />
            </div>

            <div className="modal-footer">
                <input type="button" value="Cancel" className="btn btn-default" onClick={onCancel}/>
                <input type="submit" value="Save" className="btn btn-primary" onClick={onSave}/>
            </div>

        </ModalContainer>
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
