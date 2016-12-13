import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './app/routes';
import configureStore from './app/store/configureStore';  // eslint-disable-line import/default
import {loadRooms} from './features/room/roomDucks';
import {loadMessages} from './features/chat/chatDucks';

// for Webpack:
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadRooms());
store.dispatch(loadMessages());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
