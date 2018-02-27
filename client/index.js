/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { store, history } from './store';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Timelog from './components/Timelog';
import NotFound from './components/NotFound';
import Reset from './components/Reset';
import ProjectsRoutes from './components/projects/ProjectsRoutes';

import 'normalize.css'; // eslint-disable-line import/first
import './styles/index.styl';

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/reset/:token" component={Reset} />
        <Route path="/logmeout" component={Logout} />
        <Route path="/projects" component={ProjectsRoutes} />
        <Route path="/timelog/:page" component={Timelog} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

render(<Root />, document.getElementById('app'));
