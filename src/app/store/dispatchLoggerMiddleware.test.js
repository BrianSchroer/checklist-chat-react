import expect from 'expect';
import dispatchLoggerMiddleware from './dispatchLoggerMiddleware';

describe('dispatchLoggerMiddleware', () => {
    let consoleLogCount = 0;
    let consoleGroupCount = 0;
    let consoleGroupEndCount = 0;
    let actionPassedToNext = {};

    const mockStore = {
        getState: () => { ({}); }
    };

    const nextState = { dummy: 'next state' };
    const mockNext = (action) => {
        actionPassedToNext = action;
        return nextState;
    };

    const testAction = {type: 'test'};

    const mockConsole = {
        group: () => consoleGroupCount++,
        log: () => consoleLogCount++,
        groupEnd: () => consoleGroupEndCount++
    };

    beforeEach(() => {
        consoleLogCount = 0;
        consoleGroupCount = 0;
        consoleGroupEndCount = 0;
    });

    it('should call expected console methods', () => {
        dispatchLoggerMiddleware(mockStore) (mockNext) (testAction, mockConsole);

        expect(consoleGroupCount).toBe(1);
        expect(consoleLogCount).toBe(3);
        expect(consoleGroupEndCount).toBe(1);
    });

    it('should call next with action and return next state', () => {
        const actual =
            dispatchLoggerMiddleware(mockStore) (mockNext) (testAction, mockConsole);

        expect(actionPassedToNext).toBe(testAction);
        expect(actual).toBe(nextState);
    });
});
