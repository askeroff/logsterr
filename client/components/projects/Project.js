import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDashboardData } from '../../actions/dashboard';
import { getProjects, clearProjects } from '../../actions/projects';
import { getTasks, newTask, clearTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotLoggedIn from '../NotLoggedIn';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import AddForm from './AddForm';
import MotivationBlock from './MotivationBlock';
import { formatTime } from '../../helpers';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectIndex: undefined,
      userLoaded: false,
      projectsLoaded: false,
      tasksLoaded: false,
      showForm: false,
      newTaskInput: '',
      notFound: false,
      spinner: false,
      seconds: 0,
    };
    this.showAddForm = this.showAddForm.bind(this);
    this.handleNewTaskInput = this.handleNewTaskInput.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onUpdateProjects = this.onUpdateProjects.bind(this);
    this.onUpdateTasks = this.onUpdateTasks.bind(this);
  }

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
    /*
      We need this to update time left in motivation block realtime
      without making API calls, making new actions and reducers stuff.
      The data is taken after action ADD_TIMELOG, which returns what we need here;
      Don't know how good this is, but anyhow it works.
    */
    if (nextProps.timelog.seconds !== undefined) {
      this.setState(state => ({
        seconds: state.seconds + nextProps.timelog.seconds,
      }));
    }
  }

  componentDidUpdate() {
    this.onUpdateProjects();
    this.onUpdateTasks();
  }

  onUpdateProjects() {
    if (this.props.projects.length !== 0 && !this.state.projectsLoaded) {
      this.props.projects.forEach((item, index) => {
        if (item._id === this.props.match.params.id) {
          this.setState({
            projectsLoaded: true,
            projectIndex: index,
          });
        }
        return item;
      });
      this.setState({ projectsLoaded: true });
    }
  }

  onUpdateTasks() {
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
  }

  showAddForm() {
    this.setState({
      showForm: !this.state.showForm,
    });
  }

  handleNewTaskInput(e) {
    this.setState({
      newTaskInput: e.target.value,
    });
  }

  addTask(task) {
    this.props.handleNewTask({ name: task.name, project: task.project });
    this.setState({
      showForm: false,
      spinner: true,
      newTaskInput: '',
    });
  }

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
      projectIndex !== undefined
        ? formatTime(projects[projectIndex].timeSpent)
        : '';

    const title =
      projectIndex !== undefined ? projects[projectIndex].name : '...';

    return (
      <Layout>
        <h1 className="page-title">{title}</h1>
        <h3 className="page-title">
        <span className="pretty-time">Total: {projectTime}</span>
        </h3>
        <a
          onClick={this.showAddForm}
          href="#"
          className="submit-button link-button"
        >
          {addLinkText}
        </a>

        {this.state.showForm ? (
          <AddForm
            inputValue={newTaskInput}
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

        <div className="project--desc">
          <p>
            You can checkout tasks you already done{' '}
            <Link to={`${this.props.location.pathname}/archive`}>here</Link>.
          </p>
          <MotivationBlock
            dashboardData={dashboardData}
            seconds={this.state.seconds}
            projectId={projectId}
          />
        </div>
        {this.state.spinner ? <Spinner /> : null}
        <TasksList
          projectId={this.props.match.params.id}
          tasks={this.props.tasks}
          tasksLoaded={this.state.tasksLoaded}
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
  timelog: { seconds: 0 },
};

Project.propTypes = {
  match: PropTypes.object.isRequired,
  projects: PropTypes.array,
  timelog: PropTypes.object,
  dashboardData: PropTypes.object,
  tasks: PropTypes.array,
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
  handleProjects: PropTypes.func.isRequired,
  handleDashboardData: PropTypes.func.isRequired,
  handleTasks: PropTypes.func.isRequired,
  handleNewTask: PropTypes.func.isRequired,
  clearProjectsList: PropTypes.func.isRequired,
  clearTasksList: PropTypes.func.isRequired,
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
  clearProjectsList() {
    dispatch(clearProjects());
  },
  clearTasksList() {
    dispatch(clearTasks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
