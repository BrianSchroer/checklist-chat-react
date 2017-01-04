import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalDialogType from '../../../app/modalDialogType';
import {hideModalDialog} from '../../../app/modalDialogDucks';
import {loadChatMessagesForRoom} from '../../../features/chat/chatMessageDucks';
import {saveRoomInfo} from '../../../features/room/roomDucks';
import {validate} from '../roomInfoValidator';
import RoomInfoModal from './RoomInfoModal';

class RoomInfoEditor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {shouldDisplayModal: false};

        this.resetState = this.resetState.bind(this);
        this.updateRoomState = this.updateRoomState.bind(this);
        this.saveRoom = this.saveRoom.bind(this);
        this.cancelRoomEdit = this.cancelRoomEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.resetState(nextProps);
    }

    resetState(props) {
        this.setState({
            shouldDisplayModal: props.shouldDisplayModal,
            room: Object.assign({}, props.room),
            isNewRoom: props.isNewRoom,
            isSaving: false,
            isDeleting: false,
            isDirty: false,
            errors: {}
        });
    }

    updateRoomState(event) {
        let room = this.state.room;
        room[event.target.name] = event.target.value;
        return this.setState({room: room, isDirty: true});
    }

    cancelRoomEdit(event) {
        event.preventDefault();
        this.props.actions.hideModalDialog();
    }

    saveRoom(event) {
        event.preventDefault();

        const {room, isNewRoom} = this.state;

        const validationResponse = validate(room);

        if (!validationResponse.isValid) {
            this.setState({errors: validationResponse.errors});
            return;
        }

        const actions = this.props.actions;
        actions.saveRoomInfo(room);
        actions.hideModalDialog();

        if (!isNewRoom) {
            actions.loadChatMessagesForRoom(room.id);
        }
    }

    render() {
        const state = this.state;

        if (!state.shouldDisplayModal) {
            return null;
        }

        return (
            <RoomInfoModal
                room={state.room}
                isNewRoom={state.isNewRoom}
                errors={state.errors}
                onChange={this.updateRoomState}
                onSave={this.saveRoom}
                onCancel={this.cancelRoomEdit}
            />
        );
    }
}

RoomInfoEditor.propTypes = {
    shouldDisplayModal: PropTypes.bool.isRequired,
    room: PropTypes.object.isRequired,
    isNewRoom: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};

function emptyRoom() {
    return {id: '', roomName: '', description: '', phoneInfo: ''};
}

function mapStateToProps(state) {
// TODO: Consider using reselect to memoize
    let isNewRoom = true;
    let room = emptyRoom();

    const shouldDisplayModal =
        (state.modalDialogRequest && state.modalDialogRequest.type === modalDialogType.ROOM);

    if (shouldDisplayModal) {
        const [roomId] = state.modalDialogRequest.keys;

        if (roomId) {
            isNewRoom = false;
            const rooms = state.rooms;
            room = rooms.find(room => room.id == roomId);
        }
    }

    return {shouldDisplayModal, room, isNewRoom};
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        { hideModalDialog, saveRoomInfo, loadChatMessagesForRoom },
        dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfoEditor);
