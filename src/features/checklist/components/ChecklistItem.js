import React, {PropTypes} from 'react';
import ChecklistItemStatusIcon from './CheckllistItemStatusIcon';
import PlannedVsActual from '../../../components/PlannedVsActual';
import format from '../../../util/format';
import ChecklistItemComments from './CheckListItemComments';

// This component returns a tbody because it might require multiple tr's and React requires
// returning a single root element. (It's legal for tables to have multiple tbody's.)

const ChecklistItem = ({checklistItem}) => {
    return (
        <tbody>
            <tr>
                <td><input type="button" value={checklistItem.sequenceNumber}/></td>
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
                <td>&nbsp;</td>
            </tr>
            {
                checklistItem.chatMessages && checklistItem.chatMessages.length > 0 &&
                    <ChecklistItemComments chatMessages={checklistItem.chatMessages} />
            }
        </tbody>
     );
};

ChecklistItem.propTypes = {
    checklistItem: PropTypes.object.isRequired
};

export default ChecklistItem;
