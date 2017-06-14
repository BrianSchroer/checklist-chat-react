import React from 'react';
import PropTypes from 'prop-types';
import {format} from '../../../util';
import {ChatMessageMarkdown} from '../../chat';

const ChecklistItemComment = ({chatMessage}) => {
    return (
        <tr className="checklist-item-comment-row small text-muted">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="timestamp">{format.time(chatMessage.timeStamp)}</td>
            <td colSpan="4">
                <strong>{`${chatMessage.userName}: `}</strong>
                <ChatMessageMarkdown source={chatMessage.text} className="chat-message-text" />
            </td>
        </tr>
    );
};

ChecklistItemComment.propTypes = {
    chatMessage: PropTypes.object.isRequired
};

export default ChecklistItemComment;
