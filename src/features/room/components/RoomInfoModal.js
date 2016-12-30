import React, {PropTypes} from 'react';
import TextInput from '../../../components/TextInput';

const RoomInfoModal = ({room, isNewRoom, errors, onChange, onSave, onCancel}) => {
    return (
        <div className="checklist-chat-modal-backdrop" tabIndex="-1" role="dialog">
            <div className="modal-dialog checklist-chat-modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <button type="button" className="close" aria-label="Close" onClick={onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">
                            {(isNewRoom) ? 'Add Chat Room' : 'Edit Chat Room Info'}
                        </h4>
                    </div>

                    <div className="modal-body">
                        <TextInput name="roomName" label="Chat Room Name" value={room.roomName}
                            onChange={onChange} error={errors.roomName} />

                        <TextInput name="description" label="Room Description" value={room.description}
                            onChange={onChange} error={errors.description} />

                        <TextInput name="phoneInfo" label="Phone Info" value={room.phoneInfo}
                            onChange={onChange} error={errors.phoneInfo} />
                    </div>

                    <div className="modal-footer">
                        <input type="button" value="Cancel" className="btn btn-default" onClick={onCancel}/>
                        <input type="submit" value="Save" className="btn btn-primary" onClick={onSave}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

RoomInfoModal.propTypes = {
    room: PropTypes.object.isRequired,
    isNewRoom: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default RoomInfoModal;
