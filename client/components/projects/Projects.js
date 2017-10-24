import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Add from './Add';
import Project from './Project';
import Layout from '../layout/Layout';

const Projects = ({ match }) => (
  <Switch>
    <Route
      exact
      path={match.url}
      render={() => (
        <Layout>
          <h1 className="page-title">Add A New Project</h1>

          <Link className="submit-button link-button" to={`${match.url}/add`}>
            Add
          </Link>
        </Layout>
      )}
    />
    <Route path={`${match.url}/add`} component={Add} />
    <Route path={`${match.url}/:project`} component={Project} />
  </Switch>
);

export default Projects;
