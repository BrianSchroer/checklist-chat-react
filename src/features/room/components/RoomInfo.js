import React/*, {PropTypes}*/ from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';

class RoomInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1 className="room-description">Room Description</h1>
                <p>This is the description for this chat.</p>
                <p>
                    <i className="glyphicon glyphicon-earphone"></i>&nbsp;
                    Conference Bridge: 877.909.4550 - passcode 123456
                </p>
            </div>
        );
    }
}

RoomInfo.propTypes = {
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

export default connect(mapStateToProps/*, mapDispatchToProps*/)(RoomInfo);
