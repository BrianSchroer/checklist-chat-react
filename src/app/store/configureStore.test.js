import initialState from './initialState';
import configureStore from './configureStore';

describe('configureStore', () => {
    it('should work with initial state', () => {
        configureStore(initialState);
    });

    it('should work without initial state', () => {
        configureStore();
    });
});
