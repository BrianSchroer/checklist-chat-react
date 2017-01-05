import React, {PropTypes} from 'react';
import ModalContainer from '../../../components/ModalContainer';
import TextInput from '../../../components/TextInput';

const RoomInfoModal = ({room, isNewRoom, errors, onChange, onSave, onCancel}) => {
    return (
        <ModalContainer
            title={(isNewRoom) ? 'Add Chat Room' : 'Edit Chat Room Info'}
            onCloseRequest={onCancel}>

            <div className="modal-body">
                <TextInput name="roomName" label="Chat Room Name" value={room.roomName}
                    onChange={onChange} error={errors.roomName} />

                <TextInput name="description" label="Room Description"
                    rows={2} value={room.description}
                    onChange={onChange} error={errors.description} />

                <TextInput name="phoneInfo" label="Phone Info" value={room.phoneInfo}
                    onChange={onChange} error={errors.phoneInfo} />
            </div>

            <div className="modal-footer">
                <input type="button" value="Cancel" className="btn btn-default" onClick={onCancel}/>
                <input type="submit" value="Save" className="btn btn-primary" onClick={onSave}/>
            </div>

        </ModalContainer>
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
