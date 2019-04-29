import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import promiseMiddleware from 'redux-promise-middleware';
import history from './history';
import { routerMiddleware } from 'react-router-redux';
const middleware = routerMiddleware(history);
const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        middleware,
        thunkMiddleware,
        loggerMiddleware,
        promiseMiddleware(),
    )
);
