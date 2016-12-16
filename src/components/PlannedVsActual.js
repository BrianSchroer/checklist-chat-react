import React, {PropTypes} from 'react';

const PlannedVsActual = ({planned = '', actual = ''}) => {
    if (planned) {
        if (actual)
        {
            if (planned === actual) {
                return <span>{planned}</span>;
            } else {
                return <span><span className="planned-change">{planned}</span><br/>{actual}</span>;
            }
        } else {
            return <span>{planned}</span>;
        }
    }
    else {
        if (actual) {
            return <span>{actual}</span>;
        } else {
            return <span></span>;
        }
    }
};

PlannedVsActual.propTypes = {
    planned: PropTypes.string,
    actual: PropTypes.string
}

export default PlannedVsActual;
