import React from 'react';
import PropTypes from 'prop-types';
import ChecklistAddInvitation from './ChecklistAddInvitation';
import ChecklistItem from './ChecklistItem';

const Checklist = ({checklistItems, onEditRequest}) => {
    const hasItems = checklistItems.length > 0;
    const hasNoItems = !hasItems;

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
                    </tr>
                </thead>
                {hasItems &&
                    checklistItems.map(item =>
                        <ChecklistItem key={item.id}
                            checklistItem={item}
                            onEditRequest={function(event) {
                                onEditRequest(event, item.roomId, item.sequenceNumber);
                            }}
                        />
                    )
                }
                {hasNoItems && <ChecklistAddInvitation/>}
            </table>
        </div>
    );
};

Checklist.propTypes = {
    checklistItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEditRequest: PropTypes.func.isRequired
};

export default Checklist;
