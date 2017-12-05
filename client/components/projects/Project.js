import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjects, getTasks, newTask } from '../../actions/projects';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotLoggedIn from '../NotLoggedIn';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import AddForm from './AddForm';
import { formatTime } from '../../helpers';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {},
      userLoaded: false,
      projectsLoaded: false,
      tasksLoaded: false,
      showForm: false,
      newTaskInput: '',
      notFound: false,
    };
    this.showAddForm = this.showAddForm.bind(this);
    this.handleNewTaskInput = this.handleNewTaskInput.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user &&
      nextProps.user.loggedIn === true &&
      !this.state.userLoaded
    ) {
      this.props.handleProjects(nextProps.user._id);
      this.setState({ userLoaded: true });
    }
  }

  componentDidUpdate() {
    if (this.props.projects.length !== 0 && !this.state.projectsLoaded) {
      this.props.projects.forEach(item => {
        if (item._id === this.props.match.params.id) {
          this.setState({ currentProject: item, projectsLoaded: true });
        }
        return item;
      });
      this.setState({ projectsLoaded: true });
    }

    if (
      this.state.projectsLoaded &&
      this.state.currentProject.name === undefined &&
      this.state.notFound === false
    ) {
      this.setState({ notFound: true });
    }
    if (
      this.state.projectsLoaded &&
      this.state.currentProject.name !== undefined &&
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
    });
  }

  render() {
    if (!this.state.projectsLoaded) {
      return (
        <Layout>
          <Spinner />
        </Layout>
      );
    }
    if (this.props.user && this.props.user.loggedIn === false) {
      return <NotLoggedIn />;
    }
    if (this.state.notFound) {
      return <NotFound />;
    }
    const addLinkText = this.state.showForm ? 'Hide The Form' : 'New Task';
    const projectTime = this.state.currentProject.timeSpent
      ? formatTime(this.state.currentProject.timeSpent)
      : '';
    return (
      <Layout>
        <h1 className="page-title">
          {this.state.currentProject.name || '...'}
        </h1>
        <h3 className="page-title">Time spent: {projectTime}</h3>
        <a
          onClick={this.showAddForm}
          href="#"
          className="submit-button link-button"
        >
          {addLinkText}
        </a>

        {this.state.showForm ? (
          <AddForm
            inputValue={this.state.newTaskInput}
            handleInput={this.handleNewTaskInput}
            clickHandler={e => {
              e.preventDefault();
              this.addTask({
                name: this.state.newTaskInput,
                project: this.props.match.params.id,
              });
            }}
            labelName="Name"
          />
        ) : null}

        <p>
          You can checkout tasks you already done{' '}
          <Link to={`${this.props.location.pathname}/archive`}>here</Link>
        </p>
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
};

Project.propTypes = {
  match: PropTypes.object.isRequired,
  projects: PropTypes.array,
  tasks: PropTypes.array,
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
  handleProjects: PropTypes.func.isRequired,
  handleTasks: PropTypes.func.isRequired,
  handleNewTask: PropTypes.func.isRequired,
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
  handleNewTask(task) {
    dispatch(newTask(task));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
