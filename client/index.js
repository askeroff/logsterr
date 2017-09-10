import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import 'normalize.css';
import './styles/index.styl';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch> 
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('app'));
