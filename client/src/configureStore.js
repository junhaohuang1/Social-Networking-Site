import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createRootReducer from './reducers';
import promiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'connected-react-router';
import history from "./history";
import { composeWithDevTools } from 'redux-devtools-extension';


const loggerMiddleware = createLogger();

const middleware = routerMiddleware(history);

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
          routerMiddleware(history),
          middleware,
          thunk,
          loggerMiddleware,
          promiseMiddleware(),
      )
    )
  );
  return store
}
