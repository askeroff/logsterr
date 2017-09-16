/* global document */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'normalize.css';
import './styles/index.styl';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Categories from './components/Categories';
import NotFound from './components/NotFound';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/"s component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/cats" component={Categories} />
      <Route path="/logout" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);


render(<Root />, document.getElementById('app'));
