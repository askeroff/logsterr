/* global document */
// global imports
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, browserHistory, Switch } from 'react-router-dom';
// styles
import 'normalize.css';
import './styles/index.styl';
// components
import rootReducer from './reducers/rootReducer';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import App from './components/App';
import Categories from './components/Categories';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Root = () => (
  <BrowserRouter>
    <Provider history={browserHistory} store={store}>
      <App>
        <Switch>
          <Route exact path="/" s component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/cats" component={Categories} />
          <Route path="/logout" component={Login} />
          {/*<Route component={NotFound} />*/}
        </Switch>
      </App>
    </Provider>
  </BrowserRouter>
);
render(<Root />, document.getElementById('app'));
