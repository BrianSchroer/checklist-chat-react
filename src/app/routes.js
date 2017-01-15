/* eslint-disable import/no-named-as-default */
import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/App';
import HomePage from '../features/home/components/HomePage';
import ChatRoomPage from '../features/chat/components/ChatRoomPage';
/* eslint-enable */

export const routePaths = {
    home: '/',
    roomAdd: 'room/add',
    roomView: roomId => `room/${roomId}`
};

export function redirectTo(routePath) {
    browserHistory.push(routePath);
}

export default (
    <Route path={routePaths.home} component={App}>
        <IndexRoute component={HomePage} />
        <Route path={routePaths.roomView(':id')} component={ChatRoomPage} />
    </Route>
);
