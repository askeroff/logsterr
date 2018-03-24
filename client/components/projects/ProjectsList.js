import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteProject, renameProject } from '../../actions/projects';
import ProjectItem from './ProjectItem';
import Spinner from '../layout/Spinner';

class ProjectsList extends React.Component {
  state = { spinner: true }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ spinner: false });
    }
  }
  onDelete = (id) => {
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
    const listItems = this.props.projects.map(project => (
      <ProjectItem
        onDelete={this.onDelete}
        key={project._id}
        project={project}
        renameMe={this.props.handleRenaming}
      />
    ));
    return this.state.spinner ? <Spinner /> : listItems;
  }
}

ProjectsList.defaultProps = {
  projects: [],
};

ProjectsList.propTypes = {
  projects: PropTypes.array,
  handleDeleting: PropTypes.func.isRequired,
  handleRenaming: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projectsList: state.projects,
});

const mapDispatchToProps = dispatch => ({
  handleDeleting(projectId) {
    dispatch(deleteProject(projectId));
  },
  handleRenaming(id, name) {
    dispatch(renameProject(id, name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
