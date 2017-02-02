import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import uiHelper from '../../../util/uiHelper';
import * as modalDialogActions from '../../../app/modalDialogDucks';
import {joinChat} from '../../../modules/room/roomDucks';
import RoomInfo from '../../../modules/room/components/RoomInfo';
import ChatMessageList from './ChatMessageList';
import ChatButtons from './ChatButtons';  // eslint-disable-line import/no-named-as-default
import Checklist from '../../../modules/checklist/components/Checklist';
import ChecklistButtons from '../../../modules/checklist/components/ChecklistButtons';

export class ChatRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            room: Object.assign({}, props.room)
        };

        this.handleRoomInfoEditRequest = this.handleRoomInfoEditRequest.bind(this);
        this.handleChatMessageAddRequest = this.handleChatMessageAddRequest.bind(this);
        this.handleChatParticipantsRequest = this.handleChatParticipantsRequest.bind(this);
        this.handleChecklistItemAddRequest = this.handleChecklistItemAddRequest.bind(this);
        this.handleChecklistItemEditRequest = this.handleChecklistItemEditRequest.bind(this);
    }

    componentWillMount() {
        const {actions, userId, routeParams} = this.props;

        actions.joinChat(routeParams.id, userId);
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
            uiHelper.afterRenderIsComplete(() => {
                uiHelper.scrollToBottom('chatMessageList');
            });
        }
    }

    handleRoomInfoEditRequest(event) {
        event.preventDefault();
        this.props.actions.requestRoomInfoModalDialog(this.props.room.id);
    }

    handleChatMessageAddRequest(event) {
        event.preventDefault();
        this.props.actions.requestChatMessageModalDialog();
    }

    handleChatParticipantsRequest(event) {
        event.preventDefault();
        this.props.actions.requestChatParticipantsModalDialog();
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
        const {room, userId, chatMessages} = this.props;

        return (
            <div className="chat-room-page">
                <div className="chat-room-chat-column">
                    <div className="chat-room-room-info">
                        {room && <RoomInfo room={room} onEditRequest={this.handleRoomInfoEditRequest} />}                    </div>
                    <ChatMessageList userId={userId} chatMessages={chatMessages} />
                    <div className="chat-room-buttons">
                        <ChatButtons
                            onChatMessageAddRequest={this.handleChatMessageAddRequest}
                            onChatParticipantsRequest={this.handleChatParticipantsRequest}
                        />
                    </div>
                </div>
                <div className="chat-room-checklist-column">
                    <Checklist checklistItems={this.props.checklistItems}
                        onEditRequest={this.handleChecklistItemEditRequest}/>
                    <div className="chat-room-buttons">
                        <ChecklistButtons onChecklistItemAddRequest={this.handleChecklistItemAddRequest} />
                    </div>
                </div>
            </div>
        );
    }
}

ChatRoomPage.propTypes = {
    routeParams: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    room: PropTypes.object,
    checklistItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    chatMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const room = state.rooms.find(room => room.id == state.roomId);
    const userId = state.userId;
    const checklistItems = state.checklistItems;
    const chatMessages = state.chatMessages;

    return {userId, room, checklistItems, chatMessages};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        requestChatMessageModalDialog: modalDialogActions.requestChatMessageModalDialog,
        requestChatParticipantsModalDialog: modalDialogActions.requestChatParticipantsModalDialog,
        requestChecklistItemModalDialog: modalDialogActions.requestChecklistItemModalDialog,
        requestRoomInfoModalDialog: modalDialogActions.requestRoomInfoModalDialog,
        joinChat
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
