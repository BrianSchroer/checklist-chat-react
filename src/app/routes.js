import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* eslint-disable import/no-named-as-default */
import App from './components/App';
import HomePage from '../features/home/components/HomePage';
import ChatRoomPage from '../features/chat/components/ChatRoomPage';
import AboutPage from '../features/about/components/AboutPage';
/* eslint-enable */

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="chat" component={ChatRoomPage} />
        <Route path="about" component={AboutPage} />
    </Route>
);
