// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMotivationData } from '../../actions/dashboard';
import { clearLogs } from '../../actions/timelog';
import {
  getProjects,
  clearProjects,
  addTimeToProject
} from '../../actions/projects';
import { getTasks, newTask, clearTasks, fetchTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import AddForm from './AddForm';
import MotivationBlock from './MotivationBlock';
import TimeAddForm from '../tasks/TimeAddForm';
import { formatTime } from '../../helpers';
import { IProject, IUser, IMatch } from '../../types';

type ProjectProps = {
  match: IMatch,
  projects: IProject[],
  dashboardData: {},
  user: IUser,
  location: { pathname: string },
  handleProjects: (userID: string) => void,
  handleAddingTimeToProject: (projectID: string, time: number) => void,
  handleDashboardData: () => void,
  handleTasks: (projectID: string) => void,
  handleNewTask: (data: { name: string, project: string }) => void,
  clearProjectsList: () => void,
  clearTasksList: () => void,
  clearSecondsLog: () => void
};

type State = {
  projectIndex?: number,
  userLoaded: boolean,
  projectsLoaded: boolean,
  tasksLoaded: boolean,
  showForm: boolean,
  timeForm: boolean,
  notFound: boolean,
  newTaskInput: string,
  initialTime: number
};

class Project extends React.Component<ProjectProps, State> {
  static defaultProps = {
    projects: [],
    tasks: [],
    user: {},
    dashboardData: {}
  };
  state = {
    projectIndex: undefined,
    userLoaded: false,
    projectsLoaded: false,
    tasksLoaded: false,
    showForm: false,
    timeForm: false,
    newTaskInput: '',
    notFound: false,
    initialTime: 0
  };

  componentDidMount() {
    this.props.clearProjectsList();
    this.props.clearTasksList();
  }

  componentDidUpdate() {
    this.onUpdateProjects();
    this.onUpdateTasks();
    if (this.props.user.loggedIn && !this.state.userLoaded) {
      this.props.handleProjects(this.props.user._id);
      this.props.handleDashboardData();
      this.setState({ userLoaded: true });
    }
  }

  componentWillUnmount() {
    this.props.clearSecondsLog();
  }

  onUpdateProjects = () => {
    if (this.props.projects.length !== 0 && !this.state.projectsLoaded) {
      this.props.projects.forEach((item, index) => {
        if (item._id === this.props.match.params.id) {
          this.setState({
            projectsLoaded: true,
            projectIndex: index,
            initialTime: item.timeSpent
          });
        }
        return item;
      });
      this.setState({ projectsLoaded: true });
    }
  };

  onUpdateTasks = () => {
    if (
      this.state.projectsLoaded &&
      this.state.projectIndex === undefined &&
      this.state.notFound === false
    ) {
      this.setState({ notFound: true });
    }
    if (
      this.state.projectsLoaded &&
      this.state.projectIndex !== undefined &&
      !this.state.tasksLoaded
    ) {
      this.props.handleTasks(this.props.match.params.id);
      this.setState({ tasksLoaded: true });
    }
  };

  showAddForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  showAddTimeForm = () => {
    this.setState({
      timeForm: !this.state.timeForm
    });
  };

  handleNewTaskInput = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      newTaskInput: e.currentTarget.value
    });
  };

  addTask = task => {
    this.props.handleNewTask({ name: task.name, project: task.project });
    this.setState({
      showForm: false,
      spinner: true,
      newTaskInput: ''
    });
  };

  formToggle = () => {
    this.setState(state => ({
      timeForm: !state.timeForm
    }));
  };

  render() {
    const { dashboardData, match } = this.props;
    const projectId = match.params.id;
    if (!this.state.projectsLoaded) {
      return (
        <Layout>
          <Spinner />
        </Layout>
      );
    }
    if (this.state.notFound) {
      return <NotFound />;
    }
    const { projectIndex, showForm, newTaskInput } = this.state;
    const addLinkText = showForm ? 'Hide The Form' : 'New Task';
    const { projects } = this.props;
    const projectTime =
      projectIndex !== undefined ? projects[projectIndex].timeSpent : 0;

    const title =
      projectIndex !== undefined ? projects[projectIndex].name : '...';

    return (
      <Layout>
        <div className="project__description">
          <div className="project__info">
            <h1 className="page-title">{title}</h1>
            <h3 className="page-title">
              <span className="pretty-time">
                Total: {formatTime(projectTime)}
              </span>
            </h3>
            <div className="project__buttons">
              <button onClick={this.showAddForm} className="button--submit">
                {addLinkText}
              </button>
              <button
                onClick={this.showAddTimeForm}
                className="button--submit"
                title="Add Time Specifically To The Project"
              >
                Add Time
              </button>
            </div>

            {this.state.timeForm ? (
              <TimeAddForm
                addProjectTime={this.props.handleAddingTimeToProject}
                from="project"
                formToggle={this.formToggle}
                project={projectId}
              />
            ) : null}

            {this.state.showForm ? (
              <AddForm
                inputValue={newTaskInput}
                className="form form__newtask"
                handleInput={this.handleNewTaskInput}
                clickHandler={e => {
                  e.preventDefault();
                  this.addTask({
                    name: newTaskInput,
                    project: this.props.match.params.id
                  });
                }}
                labelName="Name"
              />
            ) : null}
          </div>
          <div className="project__motivation">
            <div className="motivation-paragraph">
              <p>
                You can checkout tasks you already done{' '}
                <Link to={`${this.props.location.pathname}/archive`}>here</Link>
                .
              </p>
              <MotivationBlock
                dashboardData={dashboardData}
                projectId={projectId}
                initialTime={this.state.initialTime}
                time={projectTime}
              />
            </div>
          </div>
        </div>

        {this.props.tasks.isFetching ? (
          <Spinner />
        ) : (
          <TasksList projectId={this.props.match.params.id} />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects.list,
  user: state.user,
  tasks: state.tasks,
  dashboardData: state.dashboard,
  timelog: state.timelog
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
  handleTasks(projectId) {
    dispatch(fetchTasks());
    dispatch(getTasks(projectId, false));
  },
  handleNewTask(task) {
    dispatch(newTask(task));
  },
  handleDashboardData() {
    dispatch(getMotivationData());
  },
  handleAddingTimeToProject(id, time) {
    dispatch(addTimeToProject(id, time));
  },
  clearProjectsList() {
    dispatch(clearProjects());
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
