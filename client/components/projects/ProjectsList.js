import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsList = props => {
  const listItems = props.projects.map(project => (
    <li key={project._id}>
      <Link to={`/projects/${project.slug}`}>{project.name}</Link>
    </li>
  ));
  return listItems;
};

export default ProjectsList;
