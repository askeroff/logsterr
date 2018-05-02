import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDashboardData } from '../../actions/dashboard';
import { clearLogs } from '../../actions/timelog';
import {
  getProjects,
  clearProjects,
  addTimeToProject,
} from '../../actions/projects';
import { getTasks, newTask, clearTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotLoggedIn from '../NotLoggedIn';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import AddForm from './AddForm';
import MotivationBlock from './MotivationBlock';
import TimeAddForm from '../tasks/TimeAddForm';
import { formatTime } from '../../helpers';

class Project extends React.Component {
  state = {
    projectIndex: undefined,
    userLoaded: false,
    projectsLoaded: false,
    tasksLoaded: false,
    showForm: false,
    timeForm: false,
    newTaskInput: '',
    notFound: false,
    spinner: false,
    initialTime: 0,
  };

  componentDidMount() {
    this.props.clearProjectsList();
    this.props.clearTasksList();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.spinner === true &&
      nextProps.tasks.length > this.props.tasks.length
    ) {
      this.setState({ spinner: false });
    }
    if (
      nextProps.user &&
      nextProps.user.loggedIn === true &&
      !this.state.userLoaded
    ) {
      this.props.handleProjects(nextProps.user._id);
      this.props.handleDashboardData();
      this.setState({ userLoaded: true });
    }
  }

  componentDidUpdate() {
    this.onUpdateProjects();
    this.onUpdateTasks();
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
            initialTime: item.timeSpent,
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
      showForm: !this.state.showForm,
    });
  };

  showAddTimeForm = () => {
    this.setState({
      timeForm: !this.state.timeForm,
    });
  };

  handleNewTaskInput = e => {
    this.setState({
      newTaskInput: e.target.value,
    });
  };

  addTask = task => {
    this.props.handleNewTask({ name: task.name, project: task.project });
    this.setState({
      showForm: false,
      spinner: true,
      newTaskInput: '',
    });
  };

  formToggle = () => {
    this.setState(state => ({
      timeForm: !state.timeForm,
    }));
  };

  render() {
    const { dashboardData, match } = this.props;
    const projectId = match.params.id;

    if (this.props.user && this.props.user.loggedIn === false) {
      return <NotLoggedIn />;
    }

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
                addTime={this.props.handleAddingTimeToProject}
                name={null}
                task={null}
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
                    project: this.props.match.params.id,
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
                <Link to={`${this.props.location.pathname}/archive`}>here</Link>.
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

        {this.state.spinner ? <Spinner /> : null}

        <TasksList
          projectId={this.props.match.params.id}
          tasks={this.props.tasks}
        />
      </Layout>
    );
  }
}

Project.defaultProps = {
  projects: [],
  tasks: [],
  user: {},
  dashboardData: {},
};

Project.propTypes = {
  match: PropTypes.object.isRequired,
  projects: PropTypes.array,
  dashboardData: PropTypes.object,
  tasks: PropTypes.array,
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
  handleProjects: PropTypes.func.isRequired,
  handleAddingTimeToProject: PropTypes.func.isRequired,
  handleDashboardData: PropTypes.func.isRequired,
  handleTasks: PropTypes.func.isRequired,
  handleNewTask: PropTypes.func.isRequired,
  clearProjectsList: PropTypes.func.isRequired,
  clearTasksList: PropTypes.func.isRequired,
  clearSecondsLog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user,
  tasks: state.tasks,
  dashboardData: state.dashboard,
  timelog: state.timelog,
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
  handleTasks(projectId) {
    dispatch(getTasks(projectId));
  },
  handleNewTask(task) {
    dispatch(newTask(task));
  },
  handleDashboardData() {
    dispatch(getDashboardData());
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
