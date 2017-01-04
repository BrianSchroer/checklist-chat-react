import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalDialogType from '../../../app/modalDialogType';
import { hideModalDialog } from '../../../app/modalDialogDucks';
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
        const actions = this.props.actions;
        // actions.saveChatMessage(this.state.chatMessage);
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
    chatMessage: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const shouldDisplayModal =
        (state.modalDialogRequest && state.modalDialogRequest.type === modalDialogType.CHAT_MESSAGE);

    const chatMessage = {
        text: ''
    };

    return {shouldDisplayModal, chatMessage};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ hideModalDialog }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageEditor
);
