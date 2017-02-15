import {expect} from '../util/testHelpers';
import initialState from '../app/store/initialState';
import {reducers} from './rootReducer';

const reducerKeys = Object.keys(reducers);

describe('rootReducer', () => {
    Object.keys(initialState).forEach(key => {
        it(`should have a ${key} reducer`, () => {
            expect(reducerKeys).toInclude(key);
        });
    });
});
