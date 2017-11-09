import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsList = props => {
  const listItems = props.projects.map(project => (
    <li className="projects-list-item" key={project._id}>
      <Link className="project-list-title" to={`/projects/${project.slug}`}>
        {project.name}
      </Link>
      <span>(Edit / Delete)</span>
    </li>
  ));
  return listItems;
};

export default ProjectsList;
