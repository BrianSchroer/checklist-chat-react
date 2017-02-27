import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {uiHelper} from '../../../util';
import {validateComment} from '../checklistItemValidator';
import {saveChecklistItemComment} from '../checklistItemDucks';
import ChatMessage from '../../chat/components/ChatMessage';
import {Modal, FormGroup, TextInput} from '../../../modules/core';

export class ChecklistItemCommentEditorModal extends React.Component {

    static get propTypes() {
        return {
            checklistItem: PropTypes.object.isRequired,
            shouldFocus: PropTypes.bool,
            onCloseRequest: PropTypes.func.isRequired,
            actions: PropTypes.object.isRequired
        };
    }

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
        uiHelper.afterRenderIsComplete(() => {
            uiHelper.scrollToBottom('existingChecklistItemComments');
            if (this.props.shouldFocus) {
                uiHelper.setFocusToFirstInputInForm('checklistItemCommentEditorModalForm');
            }
        });
    }

    onChange(event) {
        const comment = this.state.comment;
        comment[event.target.name] = event.target.value;
        return this.setState({comment: comment, isDirty: true});
    }

    onSave(event) {
        event.preventDefault();

        const {checklistItem, actions, onCloseRequest} = this.props;
        const {comment} = this.state;

        const validationResponse = validateComment(comment);

        if (!validationResponse.isValid) {
            this.setState({errors: validationResponse.errors});
            return;
        }

        actions.saveChecklistItemComment(checklistItem, comment.text);
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
            <Modal
                formId="checklistItemCommentEditorModalForm"
                title={title}
                onCloseRequest={onCloseRequest}
                buttons={buttons}>

                <div>
                    {existingComments && existingComments.length &&
                        <FormGroup name="existingChecklistItemComments" label="Comments">
                            <ul id="existingChecklistItemComments"
                                className="checklist-comment-list list-unstyled">
                                {existingComments.map(comment =>
                                    <li key={comment.id}><ChatMessage chatMessage={comment}/></li>)}
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

function mapStateToProps(state, ownProps) {
    const [roomId, sequenceNumber] = state.modalDialogRequest.keys;
    const onCloseRequest = ownProps.onCloseRequest;

    const shouldFocus = (state.shouldFocus == undefined) ? true : state.shouldFocus;

    const checklistItem = state.checklistItems.find(item =>
        item.roomId === roomId && item.sequenceNumber === sequenceNumber);

    return {checklistItem, shouldFocus, onCloseRequest};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({saveChecklistItemComment}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistItemCommentEditorModal);
