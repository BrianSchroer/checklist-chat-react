import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadChatMessagesForRoom} from '../chatMessageDucks';
import {setRoomId} from '../../../features/room/roomIdDucks';
import {setRoomInfo} from '../../../features/room/roomInfoDucks';
import {showRoomInfoModalDialog} from '../../../app/modalDialogDucks';
import RoomInfo from '../../../features/room/components/RoomInfo';
import ChatMessageList from './ChatMessageList';
import NewChatMessage from './NewChatMessage';
import Checklist from '../../../features/checklist/components/Checklist';

class ChatRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            room: Object.assign({}, props.room)
        };

        this.handleRoomInfoEditRequest = this.handleRoomInfoEditRequest.bind(this);
    }

    componentWillMount() {
        const actions = this.props.actions;
        const roomId = this.props.routeParams.id;

        actions.setRoomId(roomId);
        actions.setRoomInfo(roomId);
        actions.loadChatMessagesForRoom(roomId);
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
                        {room && <RoomInfo room={room} onEditRequest={this.handleRoomInfoEditRequest} />}                    </div>
                    <div className="chat-room-message-list">
                        <ChatMessageList chatMessages={this.props.chatMessages}/>
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
    routeParams: PropTypes.object.isRequired,
    room: PropTypes.object,
    chatMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const room = state.roomInfo;
    const chatMessages = state.chatMessages;

    return {room, chatMessages};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadChatMessagesForRoom: roomId => { dispatch(loadChatMessagesForRoom(roomId)); },
            setRoomId: roomId => { dispatch(setRoomId(roomId)); },
            setRoomInfo: roomId => { dispatch(setRoomInfo(roomId)); },
            showRoomInfoModalDialog: () => { dispatch(showRoomInfoModalDialog()); }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
