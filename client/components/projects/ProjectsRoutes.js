import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Index from './Index';
import Project from './Project';
import Archive from '../tasks/Archive';

const ProjectsRoutes = ({ match }) => (
  <Switch>
    <Route exact path={match.url} render={() => <Index />} />
    <Route path={`${match.url}/:id/archive`} component={Archive} />
    <Route path={`${match.url}/:id`} component={Project} />
  </Switch>
);

ProjectsRoutes.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProjectsRoutes;
