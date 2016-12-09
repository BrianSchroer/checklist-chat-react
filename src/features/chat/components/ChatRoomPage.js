import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import RoomInfo from '../../room/components/RoomInfo';
import ChatMessageList from './ChatMessageList';
import NewChatMessage from './NewChatMessage';
import Checklist from '../../checklist/components/Checklist';

class ChatRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="chat-room-page">
                <div className="chat-room-chat-column">
                    <div className="chat-room-room-info">
                        <RoomInfo/>
                    </div>
                    <div className="chat-room-message-list">
                        <ChatMessageList messages={this.props.messages}/>
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
    messages: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
    return {
        messages: state.messages
    };
}

export default connect(mapStateToProps)(ChatRoomPage);
