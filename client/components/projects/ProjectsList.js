import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsList = props => {
  const listItems = props.projects.map(project => (
    <li className="projects-list-item" key={project._id}>
      <Link className="project-list-title" to={`/projects/${project.slug}`}>
        {project.name}
      </Link>
      <form action="/projects/delete" method="POST">
        <input type="hidden" name="id" value={project._id} />
        <input type="submit" value="Del" className="danger-button" />
      </form>
    </li>
  ));
  return listItems;
};

export default ProjectsList;
