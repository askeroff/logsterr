
import * as React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import {
  deleteProject,
  renameProject,
  toggleDone
} from '../../actions/projects';
import ProjectItem from './ProjectItem';
import { IProject } from '../../types';

interface Props {
  projects: IProject[],
  showArchived: boolean,
  handleDeleting: (projectID: string) => void,
  handleRenaming: (id: string, name: string, parentID: string) => void,
  handleToggling: (id: string) => void
}

type State = {
  spinner: boolean
};

class ProjectsList extends React.Component<Props, State> {
  static defaultProps = {
    projects: []
  };
  state = { spinner: true };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ spinner: false });
    }
  }
  onDelete = id => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this project',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.handleDeleting(id);
      } else {
        swal('Your project is safe!');
      }
    });
  };
  projects = [];

  printProjects = (parentID = '', padding = 0) => {
    // padding issues
    this.props.projects.forEach(project => {
      if (project.parent_id === parentID) {
        if (project.done === this.props.showArchived) {
          const getPadding = this.props.showArchived ? 0 : padding;
          this.projects.push(
            <ProjectItem
              onDelete={this.onDelete}
              padding={getPadding}
              toggleDone={this.props.handleToggling}
              projectsList={this.props.projects}
              key={project._id}
              project={project}
              renameMe={this.props.handleRenaming}
            />
          );
        }
        this.printProjects(project._id, padding + 16);
      }
    });
    return this.projects;
  };

  render() {
    this.projects = [];
    return this.printProjects();
  }
}

const mapStateToProps = state => ({
  projectsList: state.projects
});

const mapDispatchToProps = dispatch => ({
  handleDeleting(projectId) {
    dispatch(deleteProject(projectId));
  },
  handleRenaming(id, name, parentID) {
    dispatch(renameProject(id, name, parentID));
  },
  handleToggling(id) {
    dispatch(toggleDone(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsList);
