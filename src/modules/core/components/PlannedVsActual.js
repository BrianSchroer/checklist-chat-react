import React from 'react';
import PropTypes from 'prop-types';

const PlannedVsActual = ({planned = '', actual = ''}) => {
    let plannedClass = 'planned-value';
    let actualClass = 'actual-value-missing';

    if (planned) {
        if (actual) {
            if (planned === actual) {
                plannedClass = 'planned-value-accurate';
                actualClass = 'actual-equals-planned';
            } else {
                plannedClass = 'planned-value-inaccurate';
                actualClass = 'actual-value';
            }
        }
    } else {
        plannedClass = 'planned-value-missing';
        if (actual) {
            actualClass = 'actual-value';
        }
    }

    return (
        <div className="planned-vs-actual">
            <div className={plannedClass}>{planned}</div>
            <div className={actualClass}>{actual}</div>
        </div>
    );
};

PlannedVsActual.propTypes = {
    planned: PropTypes.string,
    actual: PropTypes.string
};

export default PlannedVsActual;
