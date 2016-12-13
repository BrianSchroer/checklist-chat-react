import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RoomList = ({rooms}) => {
    return (
        <div className="jumbotron">
            <p className="lead">Join a chat room:</p>
            <ul className="room-list list-unstyled">
                {rooms.map(room =>
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.roomName}</Link>
                        {room.description && ` - ${room.description}`}
                    </li>
                )}
            </ul>
        </div>
    );
};

RoomList.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RoomList;
