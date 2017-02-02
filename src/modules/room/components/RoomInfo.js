import React, { PropTypes } from 'react';

const RoomInfo = ({room, onEditRequest}) => {
    const shouldShowBody = (room.description || room.phoneInfo);

    return (
        <div className="panel panel-primary">
            <div className="panel-heading room-info-panel-heading">
                <div className="room-info-panel-title">
                    <h3 className="panel-title">{room.roomName}</h3>
                </div>
                <div className="room-info-panel-buttons">
                    <button className="pull-right btn btn-primary btn-sm"
                        onClick={onEditRequest}>Edit</button>
                </div>
            </div>
            {shouldShowBody &&
            <div className="panel-body">
                {room.description &&
                <p id="roomDescription">{room.description}</p>
                }

                {room.phoneInfo &&
                <p id="roomPhoneInfo">
                    <i className="glyphicon glyphicon-earphone"></i>&nbsp;{room.phoneInfo}
                </p>
                }
            </div>
            }
        </div>
    );
};

RoomInfo.propTypes = {
    room: PropTypes.object.isRequired,
    onEditRequest: PropTypes.func.isRequired
};

export default RoomInfo;
