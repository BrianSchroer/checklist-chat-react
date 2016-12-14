import React, {PropTypes} from 'react';
import TextInput from '../../../components/TextInput';

const RoomInfoForm = ({room, isSaving, isDeleting, shouldAllowDelete, errors, onChange, onSave, onDelete, onCancel}) => {
    return (
        <form>
            <TextInput name="roomName" label="Chat Room Name" value={room.roomName}
                onChange={onChange} error={errors.roomName} />

            <TextInput name="description" label="Room Description" value={room.description}
                onChange={onChange} error={errors.description} />

            <TextInput name="phoneInfo" label="Phone Info" value={room.phoneInfo}
                onChange={onChange} error={errors.phoneInfo} />

            <div className="btn-toolbar">

                <input type="submit" disabled={isSaving || isDeleting}
                    value={isSaving ? 'Saving...' : 'Save'}
                    className="btn btn-success"
                    onClick={onSave}/>

                <input type="button"
                    value="Cancel"
                    className="btn btn-warning"
                    onClick={onCancel}/>
                {
                    shouldAllowDelete &&
                        <input type="button" disabled={isSaving || isDeleting}
                            value={isDeleting ? 'Deleting...' : 'Delete'}
                            className="btn btn-danger pull-right"
                            onClick={onDelete}/>
                }
            </div>
         </form>
    );
};

RoomInfoForm.propTypes = {
    room: PropTypes.object.isRequired,
    isSaving: PropTypes.bool,
    isDeleting: PropTypes.bool,
    shouldAllowDelete: PropTypes.bool,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default RoomInfoForm;
