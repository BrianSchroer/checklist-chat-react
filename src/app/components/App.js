// This component handles the App template used on every page.
// this.props.children contains the child components (HomePage, AboutPage) from the router.
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../../modules/header/components/Header';
import ModalManager from './ModalManager'; // eslint-disable-line import/no-named-as-default
import HomePage from '../../modules/home/components/HomePage'; // eslint-disable-line import/no-named-as-default
import ChatRoomPage from '../../modules/chat/components/ChatRoomPage';  // eslint-disable-line import/no-named-as-default
import routePaths from '../routePaths';

export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id="appPage" className="app-page">
                    <ModalManager />
                    <Header/>
                    <div id="appMainRow" className="app-main-row">
                        <Switch>
                            <Route exact path={routePaths.home} component={HomePage} />
                            <Route path={routePaths.roomView(':id')} component={ChatRoomPage} />
                            <Route render={function() {
                                return <h1>Page Not Found</h1>;
                            }} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

App.propTypes = {
    isLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isLoading: (state.ajaxCallsInProgressCount > 0)
});

export default connect(mapStateToProps)(App);
