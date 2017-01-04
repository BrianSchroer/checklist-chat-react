import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadChatMessagesForRoom} from '../chatMessageDucks';
import {loadChecklistItemsForRoom} from '../../../features/checklist/checklistItemDucks';
import {requestChecklistItemModalDialog, requestRoomInfoModalDialog, hideModalDialog} from '../../../app/modalDialogDucks';
import {setRoomId, setRoomInfo} from '../../../features/room/roomDucks';
import RoomInfo from '../../../features/room/components/RoomInfo';
import ChatMessageList from './ChatMessageList';
import ChatButtons from './ChatButtons';
import Checklist from '../../../features/checklist/components/Checklist';

class ChatRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            room: Object.assign({}, props.room)
        };

        this.handleRoomInfoEditRequest = this.handleRoomInfoEditRequest.bind(this);
        this.handleChecklistItemAddRequest = this.handleChecklistItemAddRequest.bind(this);
        this.handleChecklistItemEditRequest = this.handleChecklistItemEditRequest.bind(this);
    }

    componentWillMount() {
        const actions = this.props.actions;
        const roomId = this.props.routeParams.id;

        actions.setRoomId(roomId);
        actions.setRoomInfo(roomId);
        actions.loadChecklistItemsForRoom(roomId);
        actions.loadChatMessagesForRoom(roomId);
    }

    componentWillReceiveProps(nextProps) {
        let shouldScrollMessages = false;

        if (nextProps.chatMessages) {
            if (this.props && this.props.chatMessages) {
                shouldScrollMessages =
                    (nextProps.chatMessages.length != this.props.chatMessages.length);
            }
        }

        this.setState({shouldScrollMessages});
    }

    componentDidUpdate() {
        if (this.state.shouldScrollMessages) {
            window.requestAnimationFrame(() => {
                const node = document.getElementById('chatMessageList');
                if (node) {
                    node.scrollTop = node.scrollHeight;
                }
            });
        }
    }

    handleRoomInfoEditRequest(event) {
        event.preventDefault();
        this.props.actions.requestRoomInfoModalDialog(this.props.room.id);
    }

    handleChecklistItemAddRequest(event) {
        event.preventDefault;
        this.props.actions.requestChecklistItemModalDialog(this.props.room.id);
    }

    handleChecklistItemEditRequest(event, roomId, sequenceNumber) {
        event.preventDefault();
        this.props.actions.requestChecklistItemModalDialog(roomId, sequenceNumber);
    }

    render() {
        const room = this.props.room;

        return (
            <div className="chat-room-page">
                <div className="chat-room-chat-column">
                    <div className="chat-room-room-info">
                        {room && <RoomInfo room={room} onEditRequest={this.handleRoomInfoEditRequest} />}                    </div>
                    <ChatMessageList chatMessages={this.props.chatMessages} />
                    <div className="chat-room-buttons">
                        <ChatButtons/>
                    </div>
                </div>
                <div className="chat-room-checklist-column">
                    <Checklist checklistItems={this.props.checklistItems}
                        OnAddRequest={this.handleChecklistItemAddRequest}
                        OnEditRequest={this.handleChecklistItemEditRequest}/>
                </div>
            </div>
        );
    }
}

ChatRoomPage.propTypes = {
    routeParams: PropTypes.object.isRequired,
    room: PropTypes.object,
    checklistItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    chatMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const room = state.roomInfo;
    const checklistItems = state.checklistItems;
    const chatMessages = state.chatMessages;

    return {room, checklistItems, chatMessages};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        loadChatMessagesForRoom,
        loadChecklistItemsForRoom,
        requestChecklistItemModalDialog, requestRoomInfoModalDialog, hideModalDialog,
        setRoomId, setRoomInfo
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
