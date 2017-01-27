// This component handles the App template used on every page.
// this.props.children contains the child components (HomePage, AboutPage) from the router.
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../../features/header/components/Header';
import ModalManager from './ModalManager'; // eslint-disable-line import/no-named-as-default

export class App extends React.Component {
    render() {
        return (
            <div id="appPage" className="app-page">
                <ModalManager />
                <Header/>
                <div id="appMainRow" className="app-main-row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isLoading: (state.ajaxCallsInProgressCount > 0)
});

export default connect(mapStateToProps)(App);
