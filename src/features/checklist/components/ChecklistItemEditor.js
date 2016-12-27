import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as modalDialogType from '../../../app/modalDialogType';
import {hideModalDialog} from '../../../app/modalDialogDucks';
import {saveChecklistItem} from '../checklistItemDucks';
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
        this.props.actions.saveChecklistItem(this.state.checklistItem);
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
    actions: PropTypes.object.isRequired
};

function emptyChecklistItem() {
    return {id: '', checklistItemName: '', description: '', phoneInfo: ''};
}

function mapStateToProps(state) {
// TODO: Consider using reselect to memoize
    let isNewChecklistItem = true;
    let checklistItem = emptyChecklistItem();

    const shouldDisplayModal =
        (state.modalDialogRequest && state.modalDialogRequest.type === modalDialogType.CHECKLIST_ITEM);

    if (shouldDisplayModal) {
        const [roomId, sequenceNumber] = state.modalDialogRequest.keys;

        if (sequenceNumber) {
            isNewChecklistItem = false;
            const checklistItems = state.checklistItems;
            checklistItem = checklistItems.find(item =>
                item.roomId === roomId && item.sequenceNumber === sequenceNumber);
        }
    }

    return {shouldDisplayModal, checklistItem, isNewChecklistItem};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            hideModalDialog: () => { dispatch(hideModalDialog()); },
            saveChecklistItem: checklistItem => { dispatch(saveChecklistItem(checklistItem)); }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistItemEditor);
