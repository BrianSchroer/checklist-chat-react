import React, {PropTypes} from 'react';
import ChecklistItemStatusIcon from './CheckllistItemStatusIcon';
import PlannedVsActual from '../../../components/PlannedVsActual';
import format from '../../../util/format';

const ChecklistItem = ({checklistItem}) => {
    return (
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
     );
};

ChecklistItem.propTypes = {
    checklistItem: PropTypes.object.isRequired
};

export default ChecklistItem;
