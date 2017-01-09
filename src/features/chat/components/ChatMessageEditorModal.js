import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as chatMessageType from '../chatMessageType';
import {saveChatMessage} from '../chatMessageDucks';
import {validate} from '../chatMessageValidator';
import ModalContainer from '../../../components/ModalContainer';
import TextInput from '../../../components/TextInput';

class ChatMessageEditorModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            roomId: props.roomId,
            chatMessage: Object.assign({}, props.chatMessage),
            isSaving: false,
            isDirty: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const chatMessage = this.state.chatMessage;
        chatMessage[event.target.name] = event.target.value;
        return this.setState({chatMessage: chatMessage, isDirty: true});
    }

    onSave(event) {
        event.preventDefault();

        const {chatMessage, roomId} = this.state;

        const validationResponse = validate(chatMessage);

        if (!validationResponse.isValid) {
            this.setState({errors: validationResponse.errors});
            return;
        }

        const {actions, onCloseRequest} = this.props;
        actions.saveChatMessage(chatMessage, roomId);
        onCloseRequest(event);
    }

    render() {
        const {onCloseRequest} = this.props;
        const {chatMessage, errors} = this.state;

        return (
            <ModalContainer title="Say Something..." onCloseRequest={onCloseRequest}>
                <div className="modal-body">
                    <TextInput name="text" label="Message"
                        rows={3} value={chatMessage.text}
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

ChatMessageEditorModal.propTypes = {
    roomId: PropTypes.string,
    chatMessage: PropTypes.object.isRequired,
    onCloseRequest: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const roomId = state.roomId;

    const chatMessage = {
        chatMessageType: chatMessageType.CHAT,
        text: ''
    };

    const onCloseRequest = ownProps.onCloseRequest;

    return {roomId, chatMessage, onCloseRequest};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({saveChatMessage}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageEditorModal);
