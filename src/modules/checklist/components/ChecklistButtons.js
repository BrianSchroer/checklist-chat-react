import React from 'react';
import PropTypes from 'prop-types';

const ChecklistButtons = ({onChecklistItemAddRequest}) => {
    return(
        <div>
            <button className="btn btn-primary checklist-item-button pull-right"
                onClick={onChecklistItemAddRequest}>Add Checklist Item...</button>
        </div>
    );
};

ChecklistButtons.propTypes = {
    onChecklistItemAddRequest: PropTypes.func.isRequired
};

export default ChecklistButtons;
