import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../components/Modal';

class ChatParticipantsModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const props = this.props;

        const buttons = (
            <input type="button" value="Close" className="btn btn-primary"
                onClick={props.onCloseRequest}/>
        );

        return (
            <Modal title="Who's Here?" onCloseRequest={props.onCloseRequest} buttons={buttons}>
                <div className="chat-participants">
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
            </Modal>
        );
    }
}

ChatParticipantsModal.propTypes = {
    chatParticipants: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCloseRequest: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    let chatParticipants = state.chatParticipants;
    const onCloseRequest = ownProps.onCloseRequest;

    return {chatParticipants, onCloseRequest};
}

export default connect(mapStateToProps)(ChatParticipantsModal);
