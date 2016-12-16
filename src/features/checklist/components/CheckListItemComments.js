import React, {PropTypes} from 'react';
import ChatMessageListItem from '../../chat/components/ChatMessageListItem';

const ChecklistItemComments = ({chatMessages}) => {
    return (
        <tr className="checklist-item-comment-row">
            <td colSpan="2">&nbsp;</td>
            <td colSpan="5">
                <ul className="checklist-comment-list list-unstyled">
                    {chatMessages.map(message =>
                        <ChatMessageListItem key={message.id} chatMessage={message}/> )}
                </ul>
            </td>
        </tr>
    );
};

ChecklistItemComments.propTypes = {
    chatMessages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ChecklistItemComments;
