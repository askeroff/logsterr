import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteProject, renameProject } from '../../actions/projects';
import ProjectItem from './ProjectItem';

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
    const listItems = this.props.projects.map(project => (
      <ProjectItem
        onDelete={this.onDelete}
        key={project._id}
        project={project}
        renameMe={this.props.handleRenaming}
      />
    ));
    return listItems;
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
