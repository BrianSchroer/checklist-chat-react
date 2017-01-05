import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const dispatchPromiseSupportMiddleware = (store) => (next) => (action) => { // eslint-disable-line no-unused-vars
    if (typeof action.then === 'function') { // (action is promise)
        return action.then(next);
    }

    return next(action);
};

const dispatchLoggerMiddleware = (store) => (next) => (action) => {
    const loggableActionType = `action.type: ${(action.type) ? action.type : '(unknown)'}`;

    /* eslint-disable no-console */
    console.group(loggableActionType);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: cyan', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(loggableActionType);
    /* eslint-enable */

    return returnValue;
};

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

    const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

    const dispatchMiddleware = [dispatchPromiseSupportMiddleware];

    let shouldAddLoggingToDispatch = false;
    //shouldAddLoggingToDispatch = (console.group && !isProduction);  // eslint-disable-line no-console
    if (shouldAddLoggingToDispatch) {
        dispatchMiddleware.push(dispatchLoggerMiddleware);
    }

    // Array order reversed here so items can be added to the array more logically
    // in the order in which they are processed:
    dispatchMiddleware.slice().reverse().forEach(wrapper => {
        store.dispatch = wrapper/*(store)=>*/(store)/*(next)=>*/(store.dispatch);
    });

    return store;
}
