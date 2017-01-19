import React, {PropTypes} from 'react';

const ChecklistButtons = ({OnChecklistItemAddRequest}) => {
    return(
        <div>
            <button className="btn btn-primary checklist-item-button pull-right"
                onClick={OnChecklistItemAddRequest}>Add Checklist Item...</button>
        </div>
    );
};

ChecklistButtons.propTypes = {
    OnChecklistItemAddRequest: PropTypes.func.isRequired
};

export default ChecklistButtons;
