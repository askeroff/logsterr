import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers/rootReducer';

export const history = createHistory();

const historyMiddleware = routerMiddleware(history);

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(historyMiddleware, thunk)) // eslint-disable-line comma-dangle
);

// something
