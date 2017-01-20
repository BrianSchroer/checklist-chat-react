import React, {PropTypes} from 'react';
import ChecklistItem from './ChecklistItem';

const Checklist = ({checklistItems, onEditRequest}) => {
    return (
        <div className="checklist-table-container">
            <table className="table checklist-table">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Description</th>
                        <th>Performed by</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                {checklistItems.map(item =>
                    <ChecklistItem key={item.id}
                        checklistItem={item}
                        onEditRequest={function(event) {
                            onEditRequest(event, item.roomId, item.sequenceNumber);
                        }}/>)}
            </table>
        </div>
    );
};

Checklist.propTypes = {
    checklistItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEditRequest: PropTypes.func.isRequired
};

export default Checklist;
