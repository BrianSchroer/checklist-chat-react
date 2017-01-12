import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestChecklistItemModalDialog} from '../../../app/modalDialogDucks';

class ChecklistButtons extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChecklistItemAddRequest  = this.handleChecklistItemAddRequest. bind(this);
    }

    handleChecklistItemAddRequest(event) {
        event.preventDefault();
        this.props.actions.requestChecklistItemModalDialog();
    }

    render() {
        return(
            <div>
                <button className="btn btn-secondary"
                    onClick={this.handleChecklistItemAddRequest}>Add Checklist Item...</button>
            </div>
        );
    }
}

ChecklistButtons.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {requestChecklistItemModalDialog},
        dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistButtons);
