import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import routePaths from '../../../app/routePaths';

const RoomList = ({rooms}) => {
    return (
        <div className="jumbotron">
            <p className="lead">Welcome! Join a chat room:</p>
            <ul className="room-list list-unstyled">
                {rooms.map(room =>
                    <li key={room.id}>
                        <Link to={routePaths.roomView(room.id)}>
                            <strong>{room.roomName}</strong>
                            {room.description && ` - ${room.description}`}
                        </Link>
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
