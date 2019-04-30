import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createRootReducer from './reducers';
import promiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'connected-react-router';
import history from "./history";


const loggerMiddleware = createLogger();

const middleware = routerMiddleware(history);

export default function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    applyMiddleware(
        routerMiddleware(history),
        middleware,
        thunkMiddleware,
        loggerMiddleware,
        promiseMiddleware(),
    )
  );
  return store
}
