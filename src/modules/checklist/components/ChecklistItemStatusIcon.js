import React from 'react';
import PropTypes from 'prop-types';
import {checklistItemStatus} from '../../checklist';

const ChecklistItemStatusIcon = ({status}) => {
    switch (status) {
        case checklistItemStatus.NOT_STARTED:
            return <i title="not started" className="glyphicon glyphicon-unchecked"></i>;

        case checklistItemStatus.IN_PROGRESS:
            return <i title="in progress" className="glyphicon glyphicon-repeat success-icon spinning-icon"></i>;

        case checklistItemStatus.IN_PROGRESS_WITH_ISSUES:
            return <i title="in progress with issues" className="glyphicon glyphicon-ban-circle warning-icon spinning-icon"></i>;

        case checklistItemStatus.COMPLETED_SUCCESSFULLY:
            return <i title="completed successfully" className="glyphicon glyphicon-ok success-icon"></i>;

        case checklistItemStatus.COMPLETED_WITH_ISSUES:
            return <i title="completed with issues" className="glyphicon glyphicon-check warning-icon"></i>;

        case checklistItemStatus.COMPLETED_WITH_ERRORS:
            return <i title="completed with errors" className="glyphicon glyphicon-remove error-icon"></i>;

        case checklistItemStatus.CANCELED:
            return <i title="canceled" className="glyphicon glyphicon-trash error-icon"></i>;

        default:
            return null;
    }
};

ChecklistItemStatusIcon.propTypes = {
    status: PropTypes.string.isRequired
};

export default ChecklistItemStatusIcon;
