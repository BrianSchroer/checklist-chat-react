import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalDialogType from '../../../app/modalDialogType';
import {hideModalDialog} from '../../../app/modalDialogDucks';
import * as chatMessageType from '../chatMessageType';
import {saveChatMessage} from '../chatMessageDucks';
import ChatMessageModal from './ChatMessageModal';

class ChatMessageEditor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {shouldDisplayModal: false};

        this.resetState = this.resetState.bind(this);
        this.updateChatMessageState = this.updateChatMessageState.bind(this);
        this.saveChatMessage = this.saveChatMessage.bind(this);
        this.cancelChatMessageEdit = this.cancelChatMessageEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.resetState(nextProps);
    }

    resetState(props) {
        this.setState({
            shouldDisplayModal: props.shouldDisplayModal,
            roomId: props.roomId,
            chatMessage: Object.assign({}, props.chatMessage),
            isSaving: false,
            isDirty: false,
            errors: {}
        });
    }

    updateChatMessageState(event) {
        let chatMessage = this.state.chatMessage;
        chatMessage[event.target.name] = event.target.value;
        return this.setState({chatMessage: chatMessage, isDirty: true});
    }

    cancelChatMessageEdit(event) {
        event.preventDefault();
        this.props.actions.hideModalDialog();
    }

    saveChatMessage(event) {
        event.preventDefault();

        const state = this.state;
        const actions = this.props.actions;

        actions.saveChatMessage(state.chatMessage, state.roomId);
        actions.hideModalDialog();
    }

    render() {
        const state = this.state;

        if (!state.shouldDisplayModal) {
            return null;
        }

        return (
            <ChatMessageModal
                chatMessage={state.chatMessage}
                errors={state.errors}
                onChange={this.updateChatMessageState}
                onSave={this.saveChatMessage}
                onCancel={this.cancelChatMessageEdit}
            />
        );
    }
}

ChatMessageEditor.propTypes = {
    shouldDisplayModal: PropTypes.bool.isRequired,
    roomId: PropTypes.string,
    chatMessage: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const shouldDisplayModal =
        (state.modalDialogRequest && state.modalDialogRequest.type === modalDialogType.CHAT_MESSAGE);

    const roomId = state.roomId;

    const chatMessage = {
        chatMessageType: chatMessageType.CHAT,
        text: ''
    };

    return {shouldDisplayModal, roomId, chatMessage};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {hideModalDialog, saveChatMessage},
        dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageEditor);
