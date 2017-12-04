import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjects, getTasks, newTask } from '../../actions/projects';
import Layout from '../layout/Layout';
import TasksList from '../tasks/TasksList';
import AddForm from './AddForm';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {},
      userLoaded: false,
      projectsLoaded: false,
      showForm: false,
      newTaskInput: '',
    };
    this.showAddForm = this.showAddForm.bind(this);
    this.handleNewTaskInput = this.handleNewTaskInput.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.user).length !== 0 && !this.state.userLoaded) {
      this.props.handleProjects(nextProps.user._id);
      this.setState({ userLoaded: true });
      this.props.handleTasks(this.props.match.params.id);
    }
  }

  componentDidUpdate() {
    if (this.props.projectsList.length !== 0 && !this.state.projectsLoaded) {
      this.props.projectsList.forEach(item => {
        if (item._id === this.props.match.params.id) {
          this.setState({ currentProject: item, projectsLoaded: true });
        }
        return 0;
      });
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
    const addLinkText = this.state.showForm ? 'Hide The Form' : 'New Task';
    return (
      <Layout>
        <h1 className="page-title">
          {this.state.currentProject.name || '...'}
        </h1>
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
          tasks={this.props.tasksList}
        />
      </Layout>
    );
  }
}

Project.defaultProps = {
  projectsList: [],
  tasksList: [],
  user: {},
};

Project.propTypes = {
  match: PropTypes.object.isRequired,
  projectsList: PropTypes.array,
  tasksList: PropTypes.array,
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
  handleProjects: PropTypes.func.isRequired,
  handleTasks: PropTypes.func.isRequired,
  handleNewTask: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projectsList: state.projects.projectsList,
  user: state.user,
  tasksList: state.projects.tasksList,
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
