import React, { PropTypes } from 'react';

const RoomInfo = ({room, onEditRequest}) => {
    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <div className="float-xs-right">
                    <a href="#"
                        className="pull-right room-info-edit-link"
                        onClick={onEditRequest}>Edit</a>
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
    room: PropTypes.object.isRequired,
    onEditRequest: PropTypes.func.isRequired
};

export default RoomInfo;
