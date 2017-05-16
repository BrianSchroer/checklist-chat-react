import React from 'react';
import PropTypes from 'prop-types';

const ChatButtons = ({onChatMessageAddRequest, onChatParticipantsRequest}) => {
    return(
        <div>
            <button className="btn btn-primary"
                onClick={onChatMessageAddRequest}>Say something...</button>
            <button className="btn btn-default pull-right"
                onClick={onChatParticipantsRequest}>Who's here?</button>
        </div>
    );
};

ChatButtons.propTypes = {
    onChatMessageAddRequest: PropTypes.func.isRequired,
    onChatParticipantsRequest: PropTypes.func.isRequired
};

export default ChatButtons;
