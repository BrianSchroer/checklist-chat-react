import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/App'; // eslint-disable-line import/no-named-as-default
import HomePage from '../features/home/components/HomePage';
import ChatRoomPage from '../features/chat/components/ChatRoomPage';
import EditRoomPage from '../features/room/components/EditRoomPage';

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
        <Route path={routePaths.roomAdd} component={EditRoomPage} />
        <Route path={routePaths.roomView(':id')} component={ChatRoomPage} />
    </Route>
);
