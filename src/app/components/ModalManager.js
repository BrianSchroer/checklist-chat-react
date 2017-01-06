import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalDialogType from '../modalDialogType';
import {hideModalDialog} from '../modalDialogDucks';
import ChatMessageEditorModal from '../../features/chat/components/ChatMessageEditorModal';
import ChatParticipantsModal from '../../features/chat/components/ChatParticipantsModal';
import RoomInfoEditorModal from '../../features/room/components/RoomInfoEditorModal';

/**
 * This component manages modals for the site.
 *
 * @class ModalManager
 * @extends {React.Component}
 */
class ModalManager extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(event) {
        event.preventDefault();
        this.props.actions.hideModalDialog();
    }

    render() {
        switch (this.props.modalDialogRequest.type) {

            case modalDialogType.CHAT_MESSAGE:
                return <ChatMessageEditorModal onCloseRequest={this.closeModal}/>;

            case modalDialogType.CHAT_PARTICIPANTS:
                return <ChatParticipantsModal onCloseRequest={this.closeModal}/>;

            // case modalDialogType.CHECKLIST_ITEM:
            //     return (<ChecklistItemEditor />);

            case modalDialogType.ROOM:
                return <RoomInfoEditorModal onCloseRequest={this.closeModal}/>;
        }

        return null;
    }
}

ModalManager.propTypes = {
    modalDialogRequest: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        modalDialogRequest: state.modalDialogRequest
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({hideModalDialog}, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
