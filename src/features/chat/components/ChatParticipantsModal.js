import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalContainer from '../../../components/ModalContainer';
import * as modalDialogType from '../../../app/modalDialogType';
import {requestChatParticipantsModalDialog, hideModalDialog} from '../../../app/modalDialogDucks';

class ChatParticipantsModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {shouldDisplayModal: false};

        this.resetState = this.resetState.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.resetState(nextProps);
    }

    resetState(props) {
        this.setState({
            shouldDisplayModal: props.shouldDisplayModal,
            chatParticipants: props.chatParticipants
        });
    }

    closeModal(event) {
        event.preventDefault();
        this.props.actions.hideModalDialog();
    }

    participantRow(participant) {
        return(
            <tr>
                <td>{participant.name}</td>
                <td>{participant.department}</td>
                <td>{participant.title}</td>
                <td>{participant.connection}</td>
            </tr>
        );
    }

    render() {
        const state = this.state;

        if (!state.shouldDisplayModal) {
            return null;
        }

        return (
            <ModalContainer title="Who's Here?" onCloseRequest={this.closeModal}>
                <div className="modal-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Title</th>
                                <th>Connection</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.chatParticipants.map((participant, index) =>
                            (<tr key={index}>
                                <td>{participant.name}</td>
                                <td>{participant.department}</td>
                                <td>{participant.title}</td>
                                <td>{participant.connection}</td>
                            </tr>)
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="modal-footer">
                    <input type="button" value="Close" className="btn btn-primary"
                        onClick={this.closeModal}/>
                </div>
            </ModalContainer>
        );
    }
}

ChatParticipantsModal.propTypes = {
    shouldDisplayModal: PropTypes.bool.isRequired,
    chatParticipants: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const shouldDisplayModal =
        (state.modalDialogRequest && state.modalDialogRequest.type === modalDialogType.CHAT_PARTICIPANTS);

    //const roomId = state.roomId;

    const chatParticipants = [
        {
            name: 'Brian Schroer',
            department: 'Web Development Team 2C',
            title: 'Senior Web Developer',
            connection: 'connection description'
        }
    ];

    return {shouldDisplayModal, chatParticipants};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {requestChatParticipantsModalDialog, hideModalDialog},
        dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatParticipantsModal);
