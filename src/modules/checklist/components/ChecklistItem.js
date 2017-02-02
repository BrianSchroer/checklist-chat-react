import React, {PropTypes} from 'react';
import ChecklistItemStatusIcon from './ChecklistItemStatusIcon';
import PlannedVsActual from '../../../modules/core/components/PlannedVsActual';
import format from '../../../util/format';
import ChecklistItemComment from './ChecklistItemComment';

// This component returns a tbody because it might require multiple tr's and React requires
// returning a single root element. (It's legal for tables to have multiple tbody's.)

const ChecklistItem = ({checklistItem, onEditRequest}) => {
    const comments = checklistItem.chatMessages || [];

    return (
        <tbody>
            <tr className="checklist-item-row">
                <td>
                    <button className="btn btn-primary btn-sm checklist-item-button"
                        title="Edit this item"
                        onClick={onEditRequest}>
                        {checklistItem.sequenceNumber}
                    </button>
                 </td>
                <td><ChecklistItemStatusIcon status={checklistItem.status}/></td>
                <td className="timestamp">
                    <PlannedVsActual
                        planned={format.time(checklistItem.scheduledStartTime)}
                        actual={format.time(checklistItem.actualStartTime)} />
                </td>
                <td className="timestamp">
                    <PlannedVsActual
                        planned={format.time(checklistItem.scheduledEndTime)}
                        actual={format.time(checklistItem.actualEndTime)} />
                </td>
                <td>{checklistItem.description}</td>
                <td>{checklistItem.userName}</td>
            </tr>
            {
                comments.map(comment =>
                    <ChecklistItemComment key={comment.id} chatMessage={comment}/>)
            }
        </tbody>
     );
};

ChecklistItem.propTypes = {
    checklistItem: PropTypes.object.isRequired,
    onEditRequest: PropTypes.func.isRequired
};

export default ChecklistItem;
