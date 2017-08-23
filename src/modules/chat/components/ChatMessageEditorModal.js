import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {chatMessageType} from '../../chat';
import {saveChatMessage} from '../chatDucks';
import {validate} from '../chatMessageValidator';
import {Modal, TextInput} from '../../../modules/core';

export class ChatMessageEditorModal extends React.Component {

    static get propTypes() {
        return {
            roomId: PropTypes.string.isRequired,
            onCloseRequest: PropTypes.func.isRequired,
            actions: PropTypes.object.isRequired
        };
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            chatMessage: {
                chatMessageType: chatMessageType.CHAT,
                text: ''
            },
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

        const {roomId} = this.props;
        const {chatMessage} = this.state;

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

        const buttons = (
            <div>
                <input type="button" value="Cancel" className="btn btn-default"
                    onClick={onCloseRequest}/>
                <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
        );

        return (
            <Modal
                title="Say Something..."
                onSubmit={this.onSave}
                onCloseRequest={onCloseRequest}
                buttons={buttons}>

                <TextInput name="text" label="Message"
                    rows={3} value={chatMessage.text}
                    onChange={this.onChange} error={errors.text} />

            </Modal>
        );
    }
}

export function mapStateToProps(state, ownProps) {
    const {roomId} = state;

    const onCloseRequest = ownProps.onCloseRequest;

    return {roomId, onCloseRequest};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({saveChatMessage}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageEditorModal);
