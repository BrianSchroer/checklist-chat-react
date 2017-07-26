/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalDialogType from '../modalDialogType';
import {hideModalDialog} from '../modalDialogDucks';
import ChatMessageEditorModal from '../../modules/chat/components/ChatMessageEditorModal';
import ChatParticipantsModal from '../../modules/chat/components/ChatParticipantsModal';
import ChatPriorityNotificationModal from '../../modules/chat/components/ChatPriorityNotificationModal';
import ChecklistItemEditorModal from '../../modules/checklist/components/ChecklistItemEditorModal';
import ChecklistItemCommentEditorModal from '../../modules/checklist/components/ChecklistItemCommentEditorModal';
import RoomInfoEditorModal from '../../modules/room/components/RoomInfoEditorModal';
/* eslint-enable */

/**
 * This component manages modals for the site.
 *
 * @class ModalManager
 * @extends {React.Component}
 */
export class ModalManager extends React.Component {
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

            case modalDialogType.CHAT_PRIORITY_NOTIFICATION:
                return <ChatPriorityNotificationModal onCloseRequest={this.closeModal}/>;

            case modalDialogType.CHECKLIST_ITEM:
                return <ChecklistItemEditorModal onCloseRequest={this.closeModal}/>;

            case modalDialogType.CHECKLIST_ITEM_COMMENT:
                return <ChecklistItemCommentEditorModal onCloseRequest={this.closeModal}/>;

            case modalDialogType.ROOM:
                return <RoomInfoEditorModal onCloseRequest={this.closeModal}/>;
        }

        return null;
    }
}

ModalManager.propTypes = {
    modalDialogRequest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        keys: PropTypes.array
    }).isRequired,
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
