import React, {PropTypes} from 'react';

const ChatButtons = ({OnChatMessageAddRequest, OnChatParticipantsRequest}) => {
    return(
        <div>
            <button className="btn btn-primary"
                onClick={OnChatMessageAddRequest}>Say something...</button>
            <button className="btn btn-default pull-right"
                onClick={OnChatParticipantsRequest}>Who's here?</button>
        </div>
    );
};

ChatButtons.propTypes = {
    OnChatMessageAddRequest: PropTypes.func.isRequired,
    OnChatParticipantsRequest: PropTypes.func.isRequired
};

export default ChatButtons;
