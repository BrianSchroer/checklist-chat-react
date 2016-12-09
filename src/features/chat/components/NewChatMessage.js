import React/*, {PropTypes}*/ from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';

class NewChatMessage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <p>NewChatMessage</p>
        );
    }
}

NewChatMessage.propTypes = {
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

export default connect(mapStateToProps/*, mapDispatchToProps*/)(NewChatMessage);
