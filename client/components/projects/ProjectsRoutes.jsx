// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from './Index';
import Project from './Project';
import Archive from '../tasks/Archive';
import { IMatch } from '../../types';

type Props = {
  match: IMatch,
};

const ProjectsRoutes = ({ match }: Props) => (
  <Switch>
    <Route exact path={match.url} render={() => <Index />} />
    <Route path={`${match.url}/:id/archive`} component={Archive} />
    <Route path={`${match.url}/:id`} component={Project} />
  </Switch>
);

export default ProjectsRoutes;
