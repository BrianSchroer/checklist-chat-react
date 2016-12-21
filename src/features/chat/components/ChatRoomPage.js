import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setCurrentRoomId} from '../../../app/currentRoomIdDucks';
import {showRoomInfoModalDialog} from '../../../app/modalDialogDucks';
import RoomInfo from '../../room/components/RoomInfo';
import ChatMessageList from './ChatMessageList';
import NewChatMessage from './NewChatMessage';
import Checklist from '../../checklist/components/Checklist';

class ChatRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            room: Object.assign({}, props.room)
        };

        this.handleRoomInfoEditRequest = this.handleRoomInfoEditRequest.bind(this);
    }

    componentWillMount() {
        this.props.actions.setCurrentRoomId(this.props.room.id);
    }

    handleRoomInfoEditRequest(event) {
        event.preventDefault();
        this.props.actions.showRoomInfoModalDialog();
    }

    render() {
        const room = this.props.room;

        return (
            <div className="chat-room-page">
                <div className="chat-room-chat-column">
                    <div className="chat-room-room-info">
                        <RoomInfo room={room} onEditRequest={this.handleRoomInfoEditRequest} />
                    </div>
                    <div className="chat-room-message-list">
                        <ChatMessageList chatMessages={this.props.messages}/>
                    </div>
                    <div className="chat-room-new-message">
                        <NewChatMessage/>
                    </div>
                </div>
                <div className="chat-room-checklist-column">
                    <Checklist/>
                </div>
            </div>
        );
    }
}

ChatRoomPage.propTypes = {
    room: PropTypes.object.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const roomId = ownProps.params.id; // (from the path '/room/id');
    const room = state.rooms.find(room => room.id == roomId);
    const messages = room.messages;

    return {room, messages};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            setCurrentRoomId: roomId => { dispatch(setCurrentRoomId(roomId)); },
            showRoomInfoModalDialog: () => { dispatch(showRoomInfoModalDialog()); }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
