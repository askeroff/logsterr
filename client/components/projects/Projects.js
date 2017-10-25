import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Index from './Index';
import Add from './Add';
import Project from './Project';

const Projects = ({ match }) => (
  <Switch>
    <Route exact path={match.url} render={() => <Index />} />
    <Route path={`${match.url}/add`} component={Add} />
    <Route path={`${match.url}/:project`} component={Project} />
  </Switch>
);

Projects.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Projects;
