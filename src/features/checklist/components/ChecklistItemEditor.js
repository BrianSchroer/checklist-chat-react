import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalDialogType from '../../../app/modalDialogType';
import {hideModalDialog} from '../../../app/modalDialogDucks';
import {saveChecklistItem} from '../checklistItemDucks';
import * as checklistItemStatus from '../checklistItemStatus';
import ChecklistItemModal from './ChecklistItemModal';

class ChecklistItemEditor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {shouldDisplayModal: false};

        this.resetState = this.resetState.bind(this);
        this.updateChecklistItemState = this.updateChecklistItemState.bind(this);
        this.saveChecklistItem = this.saveChecklistItem.bind(this);
        this.cancelChecklistItemEdit = this.cancelChecklistItemEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.resetState(nextProps);
    }

    resetState(props) {
        this.setState({
            shouldDisplayModal: props.shouldDisplayModal,
            checklistItem: Object.assign({}, props.checklistItem),
            isNewChecklistItem: props.isNewChecklistItem,
            maxSequenceNumber: props.maxSequenceNumber,
            isSaving: false,
            isDeleting: false,
            isDirty: false,
            errors: {}
        });
    }

    updateChecklistItemState(event) {
        let checklistItem = this.state.checklistItem;
        checklistItem[event.target.name] = event.target.value;
        return this.setState({checklistItem: checklistItem, isDirty: true});
    }

    cancelChecklistItemEdit(event) {
        event.preventDefault();
        this.props.actions.hideModalDialog();
    }

    saveChecklistItem(event) {
        event.preventDefault();
        const actions = this.props.actions;
        actions.saveChecklistItem(this.state.checklistItem);
        actions.hideModalDialog();
    }

    render() {
        const state = this.state;

        if (!state.shouldDisplayModal) {
            return null;
        }

        return (
            <ChecklistItemModal
                checklistItem={state.checklistItem}
                isNewChecklistItem={state.isNewChecklistItem}
                maxSequenceNumber={state.maxSequenceNumber}
                errors={state.errors}
                onChange={this.updateChecklistItemState}
                onSave={this.saveChecklistItem}
                onCancel={this.cancelChecklistItemEdit}
            />
        );
    }
}

ChecklistItemEditor.propTypes = {
    shouldDisplayModal: PropTypes.bool.isRequired,
    checklistItem: PropTypes.object.isRequired,
    isNewChecklistItem: PropTypes.bool.isRequired,
    maxSequenceNumber: PropTypes.number.isRequired,
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

function mapStateToProps(state) {
// TODO: Consider using reselect to memoize
    let isNewChecklistItem = true;
    let maxSequenceNumber = 1;
    let checklistItem = {};

    const shouldDisplayModal =
        (state.modalDialogRequest && state.modalDialogRequest.type === modalDialogType.CHECKLIST_ITEM);

    if (shouldDisplayModal) {
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
    }

    return {shouldDisplayModal, checklistItem, isNewChecklistItem, maxSequenceNumber};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({hideModalDialog, saveChecklistItem}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistItemEditor);
