// This component handles the App template used on every page.
// this.props.children contains the child components (HomePage, AboutPage) from the router.
import React, {PropTypes} from 'react';
import Header from '../../features/header/components/Header';
import {connect} from 'react-redux';

export class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header isLoading={this.props.isLoading}/>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    isLoading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        isLoading: (state.ajaxCallsInProgressCount > 0)
    };
}

export default connect(mapStateToProps)(App);
