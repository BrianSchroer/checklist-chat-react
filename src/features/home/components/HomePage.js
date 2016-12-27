import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setRoomId} from '../../../features/room/roomDucks';
import {requestRoomInfoModalDialog} from '../../../app/modalDialogDucks';
import RoomList from '../../../features/room/components/RoomList';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleNewChatRoomRequest = this.handleNewChatRoomRequest.bind(this);
    }

    componentWillMount() {
        this.props.actions.setRoomId(null);
    }

    handleNewChatRoomRequest() {
        this.props.actions.requestRoomInfoModalDialog(null);
    }

    render() {
        const rooms = this.props.rooms;
        const hasRooms = !!(rooms && rooms.length);

        return (
            <div className="row">
                <div className="col-md-8">
                    {hasRooms && <RoomList rooms={rooms}/>}

                    {!hasRooms &&
                        <div className="jumbotron">
                            <p className="lead">
                                There aren't any chats in progress right now. Why not start one?
                            </p>
                        </div>
                    }

                </div>
                <div className="col-md-2 col-offset-md-1">
                    <input type="button"
                        value="Start a new chat..."
                        className="btn btn-success btn-lg"
                        onClick={this.handleNewChatRoomRequest}/>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        rooms: state.rooms
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            setRoomId: roomId => { dispatch(setRoomId(roomId)); },
            requestRoomInfoModalDialog: roomId => { dispatch(requestRoomInfoModalDialog(roomId)); }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
