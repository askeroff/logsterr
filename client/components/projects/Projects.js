import React from 'react';
import { Link, Route } from 'react-router-dom';
import Add from './Add';
import Layout from '../layout/Layout';

const Projects = ({ match }) => (
  <div>
    <Route
      exact
      path={match.url}
      render={() => (
        <Layout>
          <h1 className="page-title">Add A New Project</h1>
          <Link className="button-big" to={`${match.url}/add`}>
            Add
          </Link>
        </Layout>
      )}
    />
    <Route path={`${match.url}/add`} component={Add} />
  </div>
);

export default Projects;
