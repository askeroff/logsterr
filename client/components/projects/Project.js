import React from 'react';
import Layout from '../layout/Layout';

const Project = ({ match }) => (
  <Layout>
    <h1 className="page-title">{match.params.project}!</h1>
    <p>Tasks related to your project will be here</p>
  </Layout>
);

export default Project;
