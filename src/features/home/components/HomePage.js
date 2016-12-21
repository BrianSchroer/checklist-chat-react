import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setCurrentRoomId} from '../../../app/currentRoomIdDucks';
import {showRoomInfoModalDialog} from '../../../app/modalDialogDucks';
import RoomList from '../../room/components/RoomList';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleNewChatRoomRequest = this.handleNewChatRoomRequest.bind(this);
    }

    componentWillMount() {
        this.props.actions.setCurrentRoomId(null);
    }

    handleNewChatRoomRequest() {
        this.props.actions.showRoomInfoModalDialog();
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
            setCurrentRoomId: roomId => { dispatch(setCurrentRoomId(roomId)); },
            showRoomInfoModalDialog: () => { dispatch(showRoomInfoModalDialog()); }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
