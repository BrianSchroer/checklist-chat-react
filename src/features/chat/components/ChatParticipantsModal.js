import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ModalContainer from '../../../components/ModalContainer';

class ChatParticipantsModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const props = this.props;

        return (
            <ModalContainer title="Who's Here?" onCloseRequest={props.onCloseRequest}>
                <div className="modal-body chat-participants">
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
                        onClick={props.onCloseRequest}/>
                </div>
            </ModalContainer>
        );
    }
}

ChatParticipantsModal.propTypes = {
    chatParticipants: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCloseRequest: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    let chatParticipants = [];

    const onCloseRequest = ownProps.onCloseRequest;

    const sortedNames = state.chatMessages.map(m => m.userName).sort();
    const uniqueNames = [...new Set(sortedNames)];

    chatParticipants = uniqueNames.map(userName => ({
        name: userName,
        department: 'Department',
        title: 'Title',
        connection: 'Connection'
    }));

    return {chatParticipants, onCloseRequest};
}

export default connect(mapStateToProps)(ChatParticipantsModal);
