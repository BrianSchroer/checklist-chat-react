import React, {PropTypes} from 'react';
import ChecklistItem from './ChecklistItem';

const Checklist = ({checklistItems, OnEditRequest, OnAddRequest}) => {
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
                    <ChecklistItem key={item.sequenceNumber}
                        checklistItem={item}
                        OnEditRequest={function(event) {
                            OnEditRequest(event, item.roomId, item.sequenceNumber);
                        }}/>)}
                <tfoot>
                    <tr>
                        <td colSpan="7">
                            <button className="btn btn-primary pull-right checklist-item-button"
                                onClick={OnAddRequest}>
                                Add a new checklist item
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

Checklist.propTypes = {
    checklistItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    OnEditRequest: PropTypes.func.isRequired,
    OnAddRequest: PropTypes.func.isrRequired
};

export default Checklist;
