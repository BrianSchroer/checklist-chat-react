import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as modalDialogType from '../../../app/modalDialogType';
import {hideModalDialog} from '../../../app/modalDialogDucks';
import {saveRoomInfo} from '../../../features/room/roomDucks';
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
        this.props.actions.saveRoomInfo(this.state.room);
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

    const shouldDisplayModal = (state.modalDialog === modalDialogType.ROOM);

    if (shouldDisplayModal && state.roomId) {
        const roomId = state.roomId;

        if (roomId) {
            isNewRoom = false;
            const rooms = state.rooms;
            room = rooms.find(room => room.id == roomId);
        }
    }

    return {shouldDisplayModal, room, isNewRoom};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            hideModalDialog: () => { dispatch(hideModalDialog()); },
            saveRoomInfo: roomInfo => { dispatch(saveRoomInfo(roomInfo)); }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfoEditor);
