import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects, getTasks } from '../../actions/projects';
import Layout from '../layout/Layout';
import TasksList from '../tasks/TasksList';

class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {},
      userLoaded: false,
      projectsLoaded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.user).length !== 0 && !this.state.userLoaded) {
      this.props.handleProjects(nextProps.user._id);
      this.setState({ userLoaded: true });
      this.props.handleTasks(this.props.match.params.id);
    }
  }

  componentDidUpdate() {
    if (this.props.projects.length !== 0 && !this.state.projectsLoaded) {
      this.props.projects.forEach(item => {
        if (item._id === this.props.match.params.id) {
          this.setState({ currentProject: item, projectsLoaded: true });
        }
        return 0;
      });
    }
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">
          {this.state.currentProject.name || '...'}
        </h1>
        <p>Archive of your finished tasks!</p>
        <TasksList
          filter
          projectId={this.props.match.params.id}
          tasks={this.props.tasks}
        />
      </Layout>
    );
  }
}

Archive.defaultProps = {
  projects: [],
  tasks: [],
  user: {},
};

Archive.propTypes = {
  match: PropTypes.object.isRequired,
  projects: PropTypes.array,
  tasks: PropTypes.array,
  user: PropTypes.object,
  handleProjects: PropTypes.func.isRequired,
  handleTasks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
  handleTasks(projectId) {
    dispatch(getTasks(projectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
