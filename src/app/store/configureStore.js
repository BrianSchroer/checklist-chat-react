import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import dispatchLoggerMiddleware from './dispatchLoggerMiddleware';

export default function configureStore(initialState) {
    const isProduction = (process.env.NODE_ENV === 'production');
    const middleware = [];

    middleware.push(thunk);

    if (!isProduction) {
        /*
        "Redux middleware that spits an error on you when you try to
        mutate your state either inside a dispatch or between dispatches.
        For development use only!
        https://github.com/leoasis/redux-immutable-state-invariant
        */
        middleware.push(reduxImmutableStateInvariant());
    }

    const shouldAddLoggingToDispatch = (console.group && !isProduction);  // eslint-disable-line no-console

    if (shouldAddLoggingToDispatch) {
        middleware.push(dispatchLoggerMiddleware);
    }

    return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
