/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route, browserHistory } from 'react-router-dom';
import 'normalize.css';
import './styles/index.styl';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
import Categories from './components/Categories';
import NotFound from './components/NotFound';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Root = () => (
  <Provider history={browserHistory} store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" s component={App} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/cats" component={Categories} />
        <Route path="/logout" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

render(<Root />, document.getElementById('app'));
