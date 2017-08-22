import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './app/store/configureStore';  // eslint-disable-line import/default
import App from './app/components/App';  // eslint-disable-line import/no-named-as-default
import * as roomActions from './modules/room/roomDucks';

// for Webpack:
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
store.dispatch(roomActions.loadRooms());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
