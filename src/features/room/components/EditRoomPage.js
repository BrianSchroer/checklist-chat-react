import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {redirectTo} from '../../../app/routes';
import * as actions from '../roomDucks';
import RoomInfoForm from './RoomInfoForm';

class ManageRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            room: Object.assign({}, props.room),
            isNewRoom: props.isNewRoom,
            isSaving: false,
            isDeleting: false,
            isDirty: false,
            errors: {}
        };

        this.routerWillLeave = this.routerWillLeave.bind(this);
        this.updateRoomState = this.updateRoomState.bind(this);
        this.saveRoom = this.saveRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.cancelRoomEdit = this.cancelRoomEdit.bind(this);
    }

    componentDidMount() {
        if (this.context.router) {
            /* eslint-disable react/prop-types */
            this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
            /* eslint-enable */
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.room) { // will be undefined after delete
            if (nextProps.room.id != this.props.room.id) {
                // necessary to populate form when existing course is loaded directly
                this.setState({room: Object.assign({}, nextProps.room)});
            }
        } else {
            this.setState({room: emptyRoom()});
        }
    }

    routerWillLeave() {
        if (this.state.isDirty) {
            return 'Are you sure you want to leave this page with unsaved changes?';
        }
    }

    updateRoomState(event) {
        let room = this.state.room;
        room[event.target.name] = event.target.value;
        return this.setState({room: room, isDirty: true});
    }

    cancelRoomEdit(event) {
        event.preventDefault();
        redirectTo((this.state.isNewRoom) ? '/' : `/room/${this.state.room.id}`);
    }

    saveRoom(event) {
        event.preventDefault();
    }

    deleteRoom(event) {
        event.preventDefault();
    }

    render() {
        const state = this.state;

        return (
            <div>
                <h1>{(state.isNewRoom) ? 'Start a new chat...' : 'Edit Chat Room Info'}</h1>

                <RoomInfoForm
                    room={state.room}
                    errors={state.errors}
                    isSaving={state.isSaving}
                    shouldAllowDelete={false}
                    isDeleting={state.isDeleting}
                    onChange={this.updateRoomState}
                    onSave={this.saveRoom}
                    onDelete={this.deleteRoom}
                    onCancel={this.cancelRoomEdit}
                />
            </div>
        );
    }
}

ManageRoomPage.propTypes = {
    room: PropTypes.object.isRequired,
    isNewRoom: PropTypes.bool.isRequired
};

// Pull in the React Router context so router is available as this.context.router:
ManageRoomPage.contextTypes = {
    router: PropTypes.object
};

function emptyRoom() {
    return {id: '', roomName: '', description: '', phoneInfo: ''};
}

function mapStateToProps(state, ownProps) {
    const rooms = state.rooms;
    const roomId = ownProps.params.id; // (from the path '/room/id')
    const isNewRoom = rooms.length == 0 || !roomId;

    const room = (isNewRoom) ? emptyRoom() : rooms.find(room => room.id == roomId);

    return {room, isNewRoom};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoomPage);
