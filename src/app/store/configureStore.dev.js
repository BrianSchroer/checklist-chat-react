import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

 /* eslint-disable no-console */

const addLoggingToDispatch = (store) => {
    const shouldAddLogging = false;
    const rawDispatch = store.dispatch;

    if (!shouldAddLogging || !console.group) {
        return rawDispatch;
    }

    return (action) => {
        const actionType = `action.type: ${(action.type) ? action.type : '(unknown)'}`;
        console.group(actionType);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: cyan', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(actionType);
        return returnValue;
    };
};

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            /*
            "Redux middleware that spits an error on you when you try to
            mutate your state either inside a dispatch or between dispatches.
            For development use only!
            https://github.com/leoasis/redux-immutable-state-invariant
            */
            reduxImmutableStateInvariant()
        ));

        store.dispatch = addLoggingToDispatch(store);

    return store;
}
