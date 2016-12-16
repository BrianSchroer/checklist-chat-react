import React/*, {PropTypes}*/ from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import ChecklistItem from './ChecklistItem';

class Checklist extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const items = [
            {
                sequenceNumber: 1,
                status: 'NotStarted',
                scheduledStartTime: 'Wed Dec 14 2016 14:00:00 GMT-0600 (Central Standard Time)',
                actualStartTime: null,
                scheduledEndTime: 'Wed Dec 14 2016 14:30:00 GMT-0600 (Central Standard Time)',
                actualEndTime: null,
                description: 'task description',
                userName: 'Brian Schroer'
            },
            {
                sequenceNumber: 2,
                status: 'InProgress',
                scheduledStartTime: 'Wed Dec 14 2016 15:00:00 GMT-0600 (Central Standard Time)',
                actualStartTime: 'Wed Dec 14 2016 15:01:00 GMT-0600 (Central Standard Time)',
                scheduledEndTime: 'Wed Dec 14 2016 16:00:00 GMT-0600 (Central Standard Time)',
                actualEndTime: 'Wed Dec 14 2016 15:49:00 GMT-0600 (Central Standard Time)',
                description: 'task description2',
                userName: 'Tommy Davidson'
            }
        ];

        return (
            <table className="table">
                <thead>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Description</th>
                    <th>Performed by</th>
                    <th>&nbsp;</th>
                </thead>
                <tbody>
                    {items.map(item => <ChecklistItem key={item.sequenceNumber} checklistItem={item}/>)}
                </tbody>
            </table>
        );
    }
}

Checklist.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        state: state
    };
}

// function mapDispatchToProps(dispatch) {
//     return {actions: bindActionCreators(actions, dispatch)};
// }

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Checklist);
