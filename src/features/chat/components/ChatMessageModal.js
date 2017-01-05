import React, {PropTypes} from 'react';
import TextInput from '../../../components/TextInput';

const ChatMessageModal = ({
    chatMessage,
    errors,
    onChange,
    onSave,
    onCancel}
    ) => {

    return (
        <div className="checklist-chat-modal-backdrop" tabIndex="-1" role="dialog">
            <div className="modal-dialog checklist-chat-modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <button type="button" className="close" aria-label="Close" onClick={onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Say Something...</h4>
                    </div>

                    <div className="modal-body">
                        <TextInput name="text" label="Message"
                            rows={3} value={chatMessage.text}
                            onChange={onChange} error={errors.text} />
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

ChatMessageModal.propTypes = {
    chatMessage: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ChatMessageModal;
