import React/*, {PropTypes}*/ from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';

class ChatButtons extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <div>
                <button className="btn btn-primary">Say something...</button>
                <button className="btn btn-default pull-right">Who's here?</button>
            </div>
        );
    }
}

ChatButtons.propTypes = {
    //myProp: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ( {state: state} );

// function mapDispatchToProps(dispatch) {
//     return {actions: bindActionCreators(actions, dispatch)};
// }

export default connect(mapStateToProps/*, mapDispatchToProps*/)(ChatButtons);
