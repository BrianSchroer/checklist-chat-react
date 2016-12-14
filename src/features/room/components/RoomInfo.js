import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {routePaths} from '../../../app/routes';

const RoomInfo = ({room}) => {
    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <div className="float-xs-right">
                    <Link to={routePaths.roomEdit(room.id)} className="pull-right room-info-edit-link">Edit</Link>
                </div>
                <h3 className="pane-title">{room.roomName}</h3>
            </div>
            <div className="panel-body">
                <p>{room.description}</p>

                {room.phoneInfo &&
                    <p>
                        <i className="glyphicon glyphicon-earphone"></i>
                            &nbsp;{room.phoneInfo}
                    </p>
                }
            </div>
        </div>
    );
};

RoomInfo.propTypes = {
    room: PropTypes.object.isRequired
};

export default RoomInfo;
