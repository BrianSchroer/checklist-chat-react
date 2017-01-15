import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiHelpers from '../../../util/uiHelpers';
import {validateComment} from '../checklistItemValidator';
import {saveChecklistItemComment} from '../checklistItemDucks';
import ChatMessageListItem from '../../chat/components/ChatMessageListItem';
import Modal from '../../../components/Modal';
import FormGroup from '../../../components/FormGroup';
import TextInput from '../../../components/TextInput';

class ChecklistItemCommentEditorModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            comment: {text: ''},
            isSaving: false,
            isDirty: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        uiHelpers.afterRenderIsComplete(() => {
            uiHelpers.scrollToBottom('existingChecklistItemComments');
        });
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
        const existingComments = checklistItem.chatMessages;
        const title = `Checklist item ${sequenceNumber}: \n${description}`;

        const buttons = (
            <div>
                <input type="button" value="Cancel" className="btn btn-default"
                    onClick={onCloseRequest}/>
                <input type="submit" value="Save" className="btn btn-primary"
                    onClick={this.onSave}/>
            </div>
        );

        return (
            <Modal title={title} onCloseRequest={onCloseRequest} buttons={buttons}>

                <div>
                    {existingComments && existingComments.length &&
                        <FormGroup name="existingChecklistItemComments" label="Comments">
                            <ul id="existingChecklistItemComments"
                                className="checklist-comment-list list-unstyled">
                                {existingComments.map(comment =>
                                    <ChatMessageListItem key={comment.id} chatMessage={comment}/> )}
                            </ul>
                        </FormGroup>
                    }
                    <TextInput name="text" label="New Comment"
                        rows={2} value={comment.text}
                        onChange={this.onChange} error={errors.text} />
                </div>

            </Modal>
        );
    }
}

ChecklistItemCommentEditorModal.propTypes = {
    userId: PropTypes.string.isRequired,
    checklistItem: PropTypes.object.isRequired,
    onCloseRequest: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const {userId} = state;
    const [roomId, sequenceNumber] = state.modalDialogRequest.keys;
    const onCloseRequest = ownProps.onCloseRequest;

    const checklistItem = state.checklistItems.find(item =>
        item.roomId === roomId && item.sequenceNumber === sequenceNumber);

    return {userId, checklistItem, onCloseRequest};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({saveChecklistItemComment}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistItemCommentEditorModal);
