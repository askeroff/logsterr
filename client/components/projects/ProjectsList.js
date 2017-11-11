import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e) {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this project',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        this.delForm.submit();
      } else {
        swal('Your project is safe!');
      }
    });
  }

  render() {
    const listItems = this.props.projects.map(project => (
      <li className="projects-list-item" key={project._id}>
        <Link className="project-list-title" to={`/projects/${project.slug}`}>
          {project.name}
        </Link>
        <form
          ref={delForm => {
            this.delForm = delForm;
          }}
          action="/projects/delete"
          method="POST"
        >
          <input type="hidden" name="id" value={project._id} />
          <input
            type="button"
            onClick={this.onDelete}
            value="Del"
            className="danger-button"
          />
        </form>
      </li>
    ));
    return listItems;
  }
}

ProjectsList.defaultProps = {
  projects: [],
};

ProjectsList.propTypes = {
  projects: PropTypes.array,
};

export default ProjectsList;
