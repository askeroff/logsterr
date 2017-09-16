/* global document */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'normalize.css';
import './styles/index.styl';
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
import NotFound from './components/NotFound';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/"s component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);


render(<Root />, document.getElementById('app'));
