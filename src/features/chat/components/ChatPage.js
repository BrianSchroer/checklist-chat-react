import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ChatMessageList from './ChatMessageList';

class ChatPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <ChatMessageList messages={this.props.messages}/>
            </div>
        );
    }
}

ChatPage.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
    return {
        messages: state.messages
    };
}

export default connect(mapStateToProps)(ChatPage);
