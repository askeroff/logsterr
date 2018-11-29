// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getMotivationData, fetchPosts } from '../../actions/dashboard';
import { clearLogs } from '../../actions/timelog';
import { addTimeToProject, getProjects } from '../../actions/projects';
import { getTasks, newTask, clearTasks, fetchTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import { IMatch } from '../../types';
import ProjectInfo from './ProjectInfo';

type ProjectProps = {
  match: IMatch,
  dashboardData: {},
  location: { pathname: string },
  handleAddingTimeToProject: (projectID: string, time: number) => void,
  handleDashboardData: (projectId: string) => void,
  handleTasks: (projectID: string) => void,
  handleNewTask: (data: { name: string, project: string }) => void,
  handleGettingProjects: () => void,
  clearSecondsLog: () => void
};

class Project extends React.Component<ProjectProps> {
  static defaultProps = {
    projects: { list: [] },
    tasks: { list: [] },
    user: {},
    dashboardData: {}
  };

  isReady = false;

  componentDidMount() {
    const projectTasks = this.props.tasks.list.find(
      item => item.project._id === this.props.match.params.id
    );
    if (projectTasks && projectTasks.list !== undefined) {
      this.isReady = true;
    }
    this.loadData();
    this.props.handleDashboardData(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData = () => {
    if (this.props.user.loggedIn && !this.isReady) {
      if (this.props.projects.list.length === 0) {
        this.props.handleGettingProjects();
      }
      this.props.handleTasks(this.props.match.params.id);
      this.isReady = true;
    }
  };

  componentWillUnmount() {
    this.props.clearSecondsLog();
    this.isReady = false;
  }

  render() {
    const { dashboardData, tasks } = this.props;
    const projectTasks = tasks.list.find(
      item => item.project._id === this.props.match.params.id
    );
    const showSpinner =
      (tasks.isFetching || !this.isReady) &&
      (projectTasks && projectTasks.list) === undefined;

    if (projectTasks === undefined && !showSpinner) {
      return <NotFound />;
    }

    return (
      <Layout showSpinner={showSpinner}>
        {projectTasks && projectTasks.list ? (
          <React.Fragment>
            <ProjectInfo
              project={projectTasks.project}
              handleAddingTimeToProject={this.props.handleAddingTimeToProject}
              handleNewTask={this.props.handleNewTask}
              pathname={this.props.location.pathname}
              dashboardData={dashboardData}
            />
            <TasksList
              tasks={projectTasks}
              projectId={this.props.match.params.id}
            />{' '}
          </React.Fragment>
        ) : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tasks: state.tasks,
  dashboardData: state.dashboard,
  projects: state.projects,
  timelog: state.timelog
});

const mapDispatchToProps = dispatch => ({
  handleTasks(projectId) {
    dispatch(fetchTasks());
    dispatch(getTasks(projectId, false));
  },
  handleNewTask(task) {
    dispatch(newTask(task));
  },
  handleGettingProjects() {
    dispatch(getProjects());
  },
  handleDashboardData(id) {
    dispatch(fetchPosts());
    dispatch(getMotivationData(id));
  },
  handleAddingTimeToProject(id, time) {
    dispatch(addTimeToProject(id, time));
  },
  clearTasksList() {
    dispatch(clearTasks());
  },
  clearSecondsLog() {
    dispatch(clearLogs());
    /*
      I need to clear up the seconds in the reducer, when component unmounts.
      Otherwise it computes data wrong for the other components;
    */
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
