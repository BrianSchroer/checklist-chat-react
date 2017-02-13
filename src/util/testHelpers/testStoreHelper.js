import initialState from '../../app/store/initialState';
import configureStore from '../../app/store/configureStore';

export default class {
     /**
     * Configure store for testing Redux connected component
     *
     * @static
     * @param {overridesToInitialState}
     * @returns configured store
     */
    static configureStore(overridesToInitialState) {
        const state = Object.assign({}, initialState, overridesToInitialState);
        return configureStore(state);
    }
}
