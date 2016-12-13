import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../roomDucks';

class ManageRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            room: Object.assign({}, props.room)
        };
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

    render() {
        const room = this.room;

        return (
        <h1>Manage Room</h1>
        );
    }
}

ManageRoomPage.propTypes = {
    room: PropTypes.object.isRequired
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

    const room = (roomId && rooms.length > 0)
        ? rooms.find(room => room.id == roomId)
        : emptyRoom();

    return {
        room: room
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoomPage);
