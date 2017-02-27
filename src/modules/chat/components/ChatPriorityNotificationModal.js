import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Modal} from '../../../modules/core';
import ChatMessage from './ChatMessage';

export class ChatPriorityNotificationModal extends React.Component {

    static get propTypes()  {
        return {
            chatMessage: PropTypes.object.isRequired,
            onCloseRequest: PropTypes.func.isRequired
        };
    }

   constructor(props, context) {
        super(props, context);
    }

    render() {
        const {chatMessage, onCloseRequest} = this.props;

        const buttons = (
            <input type="button" value="Close" className="btn btn-primary"
                onClick={onCloseRequest}/>
        );

        return (
            <Modal title={`Important message from ${chatMessage.userName}`}
                onCloseRequest={onCloseRequest}
                buttons={buttons}>

                <ChatMessage chatMessage={chatMessage} />

            </Modal>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const [chatMessage] = state.modalDialogRequest.keys;
    const onCloseRequest = ownProps.onCloseRequest;

    return {chatMessage, onCloseRequest};
}

export default connect(mapStateToProps)(ChatPriorityNotificationModal);
