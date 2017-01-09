import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadChatMessagesForRoom} from '../../../features/chat/chatDucks';
import {saveRoomInfo} from '../../../features/room/roomDucks';
import {validate} from '../roomInfoValidator';
import ModalContainer from '../../../components/ModalContainer';
import TextInput from '../../../components/TextInput';

class RoomInfoEditorModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            room: Object.assign({}, this.props.room),
            isSaving: false,
            isDeleting: false,
            isDirty: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const room = this.state.room;
        room[event.target.name] = event.target.value;
        return this.setState({room: room, isDirty: true});
    }

    onSave(event) {
        event.preventDefault();

        const {room, isDirty, isNewRoom} = this.state;
        const {actions, onCloseRequest} = this.props;

        if (!isNewRoom && !isDirty) {
            onCloseRequest(event);
            return;
        }

        const validationResponse = validate(room);

        if (!validationResponse.isValid) {
            this.setState({errors: validationResponse.errors});
            return;
        }

        actions.saveRoomInfo(room);
        onCloseRequest(event);

        if (isNewRoom) {
            //TODO: route to new room?
        } else {
            actions.loadChatMessagesForRoom(room.id);
        }
    }

    render() {
        const {isNewRoom, onCloseRequest} = this.props;
        const {room, errors} = this.state;

        return (
            <ModalContainer
                title={(isNewRoom) ? 'Add Chat Room' : 'Edit Chat Room Info'}
                onCloseRequest={onCloseRequest}>

                <div className="modal-body">
                    <TextInput name="roomName" label="Chat Room Name" value={room.roomName}
                        onChange={this.onChange} error={errors.roomName} />

                    <TextInput name="description" label="Room Description"
                        rows={2} value={room.description}
                        onChange={this.onChange} error={errors.description} />

                    <TextInput name="phoneInfo" label="Phone Info" value={room.phoneInfo}
                        onChange={this.onChange} error={errors.phoneInfo} />
                </div>

                <div className="modal-footer">
                    <input type="button" value="Cancel" className="btn btn-default" onClick={onCloseRequest}/>
                    <input type="submit" value="Save" className="btn btn-primary" onClick={this.onSave}/>
                </div>

            </ModalContainer>
        );
    }
}

RoomInfoEditorModal.propTypes = {
    room: PropTypes.object.isRequired,
    isNewRoom: PropTypes.bool.isRequired,
    onCloseRequest: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function emptyRoom() {
    return {id: '', roomName: '', description: '', phoneInfo: ''};
}

function mapStateToProps(state, ownProps) {
    let isNewRoom = true;
    let room = emptyRoom();

    const [roomId] = state.modalDialogRequest.keys;

    if (roomId) {
        isNewRoom = false;
        const rooms = state.rooms;
        room = rooms.find(room => room.id == roomId);
    }

    const onCloseRequest = ownProps.onCloseRequest;

    return {onCloseRequest, room, isNewRoom};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {saveRoomInfo, loadChatMessagesForRoom},
        dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfoEditorModal);
