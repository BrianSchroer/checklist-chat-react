import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {validateComment} from '../checklistItemValidator';
import {saveChecklistItemComment} from '../checklistItemDucks';
import ModalContainer from '../../../components/ModalContainer';
import TextInput from '../../../components/TextInput';

class ChecklistItemCommentEditorModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            comment: Object.assign({}, props.comment),
            isSaving: false,
            isDirty: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const comment = this.state.comment;
        comment[event.target.name] = event.target.value;
        return this.setState({comment: comment, isDirty: true});
    }

    onSave(event) {
        event.preventDefault();

        const {userId, checklistItem, actions, onCloseRequest} = this.props;
        const {comment} = this.state;

        const validationResponse = validateComment(comment);

        if (!validationResponse.isValid) {
            this.setState({errors: validationResponse.errors});
            return;
        }

        actions.saveChecklistItemComment(checklistItem, comment.text, userId);
        onCloseRequest(event);
    }

    render() {
        const {checklistItem, onCloseRequest} = this.props;
        const {comment, errors} = this.state;
        const {sequenceNumber, description} = checklistItem;
        const title = `Add a comment to checklist item \n${sequenceNumber}: "${description}"`;

        return (
            <ModalContainer title={title} onCloseRequest={onCloseRequest}>
                <div className="modal-body">
                    <TextInput name="text" label="Comment"
                        rows={2} value={comment.text}
                        onChange={this.onChange} error={errors.text} />
                </div>

                <div className="modal-footer">
                    <input type="button" value="Cancel" className="btn btn-default"
                        onClick={onCloseRequest}/>
                    <input type="submit" value="Save" className="btn btn-primary"
                        onClick={this.onSave}/>
                </div>
            </ModalContainer>
        );
    }
}

ChecklistItemCommentEditorModal.propTypes = {
    userId: PropTypes.string.isRequired,
    checklistItem: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    onCloseRequest: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const {userId} = state;
    const [roomId, sequenceNumber] = state.modalDialogRequest.keys;
    const comment = { text: '' };
    const onCloseRequest = ownProps.onCloseRequest;

    const checklistItems = state.checklistItems;
    const checklistItem = checklistItems.find(item =>
        item.roomId === roomId && item.sequenceNumber === sequenceNumber);

    return {userId, checklistItem, comment, onCloseRequest};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({saveChecklistItemComment}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistItemCommentEditorModal);
