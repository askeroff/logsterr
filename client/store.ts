import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers/rootReducer';

const history = createBrowserHistory();

const historyMiddleware = routerMiddleware(history);

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(historyMiddleware, thunk),
    typeof window === 'object' &&
      typeof window.window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  ) // eslint-disable-line comma-dangle
);

// something
