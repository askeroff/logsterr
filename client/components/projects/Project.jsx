// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getMotivationData } from '../../actions/dashboard';
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
  clearTasksList: () => void,
  handleGettingProjects: () => void,
  clearSecondsLog: () => void
};

class Project extends React.Component<ProjectProps> {
  static defaultProps = {
    projects: [],
    tasks: [],
    user: {},
    dashboardData: {}
  };

  componentDidMount() {
    this.props.clearTasksList();
    this.props.handleGettingProjects();
    this.props.handleDashboardData(this.props.match.params.id);
    this.props.handleTasks(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearSecondsLog();
  }

  render() {
    const { dashboardData, tasks } = this.props;
    const showSpinner = this.props.tasks.isFetching || this.props.tasks.project === undefined;
    if (tasks.project === false) {
      return <NotFound />;
    }

    return (
      <Layout showSpinner={showSpinner}>
        <ProjectInfo
          project={tasks.project}
          handleAddingTimeToProject={this.props.handleAddingTimeToProject}
          handleNewTask={this.props.handleNewTask}
          pathname={this.props.location.pathname}
          dashboardData={dashboardData}
        />
        <TasksList projectId={this.props.match.params.id} />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tasks: state.tasks,
  dashboardData: state.dashboard,
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
