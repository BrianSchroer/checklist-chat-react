import React, {PropTypes} from 'react';
import moment from 'moment';

const TimeStamp = ({timeStamp}) => {
    return (
        <span className="time-stamp">
            {moment(timeStamp).format('h:mm a')}
        </span>);
};

TimeStamp.propTypes = {
    timeStamp: PropTypes.string.isRequired
};

export default TimeStamp;
