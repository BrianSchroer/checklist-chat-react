import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestChatMessageModalDialog, requestChatParticipantsModalDialog} from '../../../app/modalDialogDucks';

class ChatButtons extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChatMessageAddRequest  = this.handleChatMessageAddRequest. bind(this);
        this.handleChatParticipantsRequest = this.handleChatParticipantsRequest.bind(this);
    }

    handleChatMessageAddRequest(event) {
        event.preventDefault();
        this.props.actions.requestChatMessageModalDialog();
    }

    handleChatParticipantsRequest(event) {
        event.preventDefault();
        this.props.actions.requestChatParticipantsModalDialog();
    }

    render() {
        return(
            <div>
                <button className="btn btn-primary"
                    onClick={this.handleChatMessageAddRequest}>Say something...</button>
                <button className="btn btn-default pull-right"
                    onClick={this.handleChatParticipantsRequest}>Who's here?</button>
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
    actions: bindActionCreators(
        {requestChatMessageModalDialog, requestChatParticipantsModalDialog},
        dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatButtons);
