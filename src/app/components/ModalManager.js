import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalDialogType from '../modalDialogType';
import {hideModalDialog} from '../modalDialogDucks';
import ChatParticipantsModal from '../../features/chat/components/ChatParticipantsModal';
import RoomInfoEditor from '../../features/room/components/RoomInfoEditor';
import ChatMessageEditor from '../../features/chat/components/ChatMessageEditor';
import ChecklistItemEditor from '../../features/checklist/components/ChecklistItemEditor';

/**
 * This component manages modals for the site.
 *
 * @class ModalManager
 * @extends {React.Component}
 */
class ModalManager extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        switch (this.props.modalDialogRequest.type) {

            case modalDialogType.CHAT_MESSAGE:
                return (<ChatMessageEditor />);

            case modalDialogType.CHAT_PARTICIPANTS:
                return (<ChatParticipantsModal />);

            case modalDialogType.CHECKLIST_ITEM:
                return (<ChecklistItemEditor />);

            case modalDialogType.ROOM:
                return (<RoomInfoEditor />);
        }

        return null;
    }
}

ModalManager.propTypes = {
    modalDialogRequest: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        modalDialogRequest: state.modalDialogRequest
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({hideModalDialog}, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
