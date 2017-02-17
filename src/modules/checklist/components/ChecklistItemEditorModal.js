import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveChecklistItem} from '../checklistItemDucks';
import {requestChecklistItemCommentModalDialog} from '../../../app/modalDialogDucks';
import {checklistItemStatus} from '../../checklist';
import {validate} from '../checklistItemValidator';
import {FormGroup, Modal, SelectInput, TextInput, SimpleSelectInput} from '../../../modules/core';
import {format} from '../../../util';
import ChecklistItemStatusIcon from './ChecklistItemStatusIcon';

export class ChecklistItemEditorModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            checklistItem: Object.assign({}, props.checklistItem),
            isSaving: false,
            isDeleting: false,
            isDirty: false,
            comment: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCommentRequest = this.onCommentRequest.bind(this);
    }

    onChange(event) {
        const checklistItem = this.state.checklistItem;
        checklistItem[event.target.name] = event.target.value;
        return this.setState({checklistItem: checklistItem, isDirty: true});
    }

    onSave(event) {
        event.preventDefault();
        const {checklistItem} = this.state;

        const validationResponse = validate(checklistItem);

        if (!validationResponse.isValid) {
            this.setState({errors: validationResponse.errors});
            return;
        }

        const {actions, onCloseRequest} = this.props;
        actions.saveChecklistItem(checklistItem, checklistItem.roomId);
        onCloseRequest(event);
    }

    onCommentRequest(event) {
        event.preventDefault();

        const {actions, checklistItem} = this.props;

        actions.requestChecklistItemCommentModalDialog(
            checklistItem.roomId, checklistItem.sequenceNumber);
    }

    render() {
        const {isNewChecklistItem, maxSequenceNumber, onCloseRequest} = this.props;
        const {checklistItem, errors} = this.state;

        const sequenceNumberOptions = [...Array(maxSequenceNumber).keys()].map(i =>
        {
            const sequenceNumber = (i + 1).toString();
            return {value: sequenceNumber, text: sequenceNumber};
        });

        const buttons = (
            <div>
                {!isNewChecklistItem &&
                    <input type="button" value="Add Comment..."
                        className="btn btn-secondary pull-left" onClick={this.onCommentRequest} />
                }
                <input type="button" value="Cancel" className="btn btn-default"
                    onClick={onCloseRequest}/>
                <input type="submit" value="Save" className="btn btn-primary"
                    onClick={this.onSave}/>
            </div>
        );

        return (
            <Modal
                title={(isNewChecklistItem) ? 'Add New Checklist Item' : 'Edit Checklist Item'}
                onCloseRequest={onCloseRequest}
                buttons={buttons}>

                <div>
                    <div className="checklist-form-sequence-number-row">
                        <SelectInput name="sequenceNumber" label="Sequence Number"
                            options={sequenceNumberOptions}
                            value={checklistItem.sequenceNumber.toString()}
                            onChange={this.onChange} error={errors.sequenceNumber} />
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
                                    onChange={this.onChange} />
                            </div>
                        </FormGroup>
                    </div>

                    <TextInput name="description" label="Description" value={checklistItem.description}
                        rows={2} onChange={this.onChange} error={errors.description} />

                    <div className="checklist-form-timestamps">
                        <TextInput name="scheduledStartTime" label="Start Time: Scheduled"
                            value={format.time(checklistItem.scheduledStartTime)}
                            onChange={this.onChange} error={errors.scheduledStartTime} />
                        <TextInput name="actualStartTime" label="Actual"
                            value={format.time(checklistItem.actualStartTime)}
                            onChange={this.onChange} error={errors.actualStartTime} />
                    </div>

                    <div className="checklist-form-timestamps">
                        <TextInput name="scheduledEndTime" label="End Time: Scheduled"
                            value={format.time(checklistItem.scheduledEndTime)}
                            onChange={this.onChange} error={errors.scheduledEndTime} />
                        <TextInput name="actualEndTime" label="Actual"
                            value={format.time(checklistItem.actualEndTime)}
                            onChange={this.onChange} error={errors.actualEndTime} />
                    </div>

                    <TextInput name="userName" label="Performed by" value={checklistItem.userName}
                        onChange={this.onChange} error={errors.userName} />
                </div>

            </Modal>
        );
    }
}

ChecklistItemEditorModal.propTypes = {
    checklistItem: PropTypes.object.isRequired,
    isNewChecklistItem: PropTypes.bool.isRequired,
    maxSequenceNumber: PropTypes.number.isRequired,
    onCloseRequest: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function emptyChecklistItem(roomId, sequenceNumber) {
    return {
        id: null,
        roomId: roomId,
        sequenceNumber: sequenceNumber,
        status: checklistItemStatus.NOT_STARTED,
        description: null,
        scheduledStartTime: null,
        scheduledEndTime: null,
        actualStartTime: null,
        actualEndTime: null
    };
}

function mapStateToProps(state, ownProps) {
    let isNewChecklistItem = true;
    let maxSequenceNumber = 1;
    let checklistItem = {};

    const [roomId, sequenceNumber] = state.modalDialogRequest.keys;
    maxSequenceNumber = state.checklistItems.length + 1;

    if (sequenceNumber) {
        isNewChecklistItem = false;
        const checklistItems = state.checklistItems;
        checklistItem = checklistItems.find(item =>
            item.roomId === roomId && item.sequenceNumber === sequenceNumber);
        maxSequenceNumber--;
    } else {
        checklistItem = emptyChecklistItem(roomId, maxSequenceNumber);
    }

    const onCloseRequest = ownProps.onCloseRequest;

    return {checklistItem, isNewChecklistItem, maxSequenceNumber, onCloseRequest};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {saveChecklistItem, requestChecklistItemCommentModalDialog},
        dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistItemEditorModal);
