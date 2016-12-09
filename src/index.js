import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './app/routes';
import configureStore from './app/store/configureStore';  // eslint-disable-line import/default
import {loadMessages} from './features/chat/chatDucks';

// for Webpack:
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.eot';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.svg';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.ttf';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.woff2';

const store = configureStore();
store.dispatch(loadMessages());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
