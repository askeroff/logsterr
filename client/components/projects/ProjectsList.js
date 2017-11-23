import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../actions/projects';

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this project',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        this.props.handleDeleting(id);
      } else {
        swal('Your project is safe!');
      }
    });
  }

  render() {
    const listItems = this.props.projectsList.map(project => (
      <li className="projects-list-item" key={project._id}>
        <Link className="project-list-title" to={`/projects/${project._id}`}>
          {project.name}
        </Link>
        <div className="buttons-group">
          <Link
            className="info-button link"
            to={`/projects/${project._id}/edit`}
          >
            Edit
          </Link>

          <a
            href="#"
            onClick={() => this.onDelete(project._id)}
            className="danger-button link"
          >
            Delete
          </a>
        </div>
      </li>
    ));
    return listItems;
  }
}

ProjectsList.defaultProps = {
  projectsList: [],
};

ProjectsList.propTypes = {
  projectsList: PropTypes.array,
  handleDeleting: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projectsList: state.projects.projectsList,
});

const mapDispatchToProps = dispatch => ({
  handleDeleting(projectId) {
    dispatch(deleteProject(projectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
