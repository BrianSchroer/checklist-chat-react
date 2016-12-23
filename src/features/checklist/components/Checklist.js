import React, {PropTypes} from 'react';
import ChecklistItem from './ChecklistItem';

const Checklist = ({checklistItems}) => {
    return (
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
            {checklistItems.map(item => <ChecklistItem key={item.sequenceNumber} checklistItem={item}/>)}
        </table>
    );
};

Checklist.propTypes = {
    checklistItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Checklist;
