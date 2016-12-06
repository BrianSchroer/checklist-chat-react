import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(
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
}
