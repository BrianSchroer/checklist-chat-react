/* eslint-disable no-console */

const dispatchLoggerMiddleware = (store) => (next) => (action, cnsl = console) => {
    const loggableActionType = (action.type) ? action.type : '(unknown action type)';

    cnsl.group(loggableActionType);
    cnsl.log('%c prev state', 'color: gray', store.getState());
    cnsl.log('%c action', 'color: cyan', action);
    const returnValue = next(action);
    cnsl.log('%c next state', 'color: green', store.getState());
    cnsl.groupEnd(loggableActionType);

    return returnValue;
};

export default dispatchLoggerMiddleware;
