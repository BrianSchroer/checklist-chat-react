/* eslint-disable no-console */

const dispatchLoggerMiddleware = (store) => (next) => (action) => {
    const loggableActionType = (action.type) ? action.type : '(unknown action type)';

    console.group(loggableActionType);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: cyan', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(loggableActionType);

    return returnValue;
};

export default dispatchLoggerMiddleware;
