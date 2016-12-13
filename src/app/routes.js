import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* eslint-disable import/no-named-as-default */
import App from './components/App';
import HomePage from '../features/home/components/HomePage';
import ChatRoomPage from '../features/chat/components/ChatRoomPage';
import EditRoomPage from '../features/room/components/EditRoomPage';
/* eslint-enable */

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="room/add" component={EditRoomPage} />
        <Route path="room/edit/:id" component={EditRoomPage} />
        <Route path="room/:id" component={ChatRoomPage} />
    </Route>
);
