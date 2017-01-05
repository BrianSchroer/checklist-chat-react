import React, {PropTypes} from 'react';
import ModalContainer from '../../../components/ModalContainer';
import TextInput from '../../../components/TextInput';

const ChatMessageModal = ({
    chatMessage,
    errors,
    onChange,
    onSave,
    onCancel}
    ) => {

    return (
        <ModalContainer title="Say Something..." onCloseRequest={onCancel}>
            <div className="modal-body">
                <TextInput name="text" label="Message"
                    rows={3} value={chatMessage.text}
                    onChange={onChange} error={errors.text} />
            </div>

            <div className="modal-footer">
                <input type="button" value="Cancel" className="btn btn-default" onClick={onCancel}/>
                <input type="submit" value="Save" className="btn btn-primary" onClick={onSave}/>
            </div>
        </ModalContainer>
    );
};

ChatMessageModal.propTypes = {
    chatMessage: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ChatMessageModal;
