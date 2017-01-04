import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestChatMessageModalDialog} from '../../../app/modalDialogDucks';

class ChatButtons extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChatMessageAddRequest  = this.handleChatMessageAddRequest. bind(this);
    }

    handleChatMessageAddRequest(event) {
        event.preventDefault();
        this.props.actions.requestChatMessageModalDialog();
    }

    render() {
        return(
            <div>
                <button className="btn btn-primary" onClick={this.handleChatMessageAddRequest}>Say something...</button>
                <button className="btn btn-default pull-right">Who's here?</button>
            </div>
        );
    }
}

ChatButtons.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({requestChatMessageModalDialog}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatButtons);
