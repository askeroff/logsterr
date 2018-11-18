// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMotivationData } from '../../actions/dashboard';
import { clearLogs } from '../../actions/timelog';
import { addTimeToProject } from '../../actions/projects';
import { getTasks, newTask, clearTasks, fetchTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import AddForm from './AddForm';
import MotivationBlock from './MotivationBlock';
import TimeAddForm from '../tasks/TimeAddForm';
import { formatTime } from '../../helpers';
import { IMatch } from '../../types';

type ProjectProps = {
  match: IMatch,
  dashboardData: {},
  location: { pathname: string },
  handleAddingTimeToProject: (projectID: string, time: number) => void,
  handleDashboardData: (projectId: string) => void,
  handleTasks: (projectID: string) => void,
  handleNewTask: (data: { name: string, project: string }) => void,
  clearTasksList: () => void,
  clearSecondsLog: () => void
};

type State = {
  showForm: boolean,
  timeForm: boolean,
  newTaskInput: string
};

class Project extends React.Component<ProjectProps, State> {
  static defaultProps = {
    projects: [],
    tasks: [],
    user: {},
    dashboardData: {}
  };
  state = {
    showForm: false,
    timeForm: false,
    newTaskInput: ''
  };

  componentDidMount() {
    this.props.clearTasksList();
    this.props.handleDashboardData(this.props.match.params.id);
    this.props.handleTasks(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearSecondsLog();
  }

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
      newTaskInput: ''
    });
  };

  formToggle = () => {
    this.setState(state => ({
      timeForm: !state.timeForm
    }));
  };

  render() {
    const { dashboardData, tasks } = this.props;
    if (this.props.tasks.isFetching || this.props.tasks.project === undefined) {
      return (
        <Layout>
          <Spinner />
        </Layout>
      );
    }
    if (tasks.project === false) {
      return <NotFound />;
    }
    const { showForm, newTaskInput } = this.state;
    const addLinkText = showForm ? 'Hide The Form' : 'New Task';
    const projectTime = tasks.project.timeSpent;

    const title = tasks.project.name;

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
                title="Add Time To The Project"
              >
                Add Time
              </button>
            </div>

            {this.state.timeForm ? (
              <TimeAddForm
                addProjectTime={this.props.handleAddingTimeToProject}
                from="project"
                formToggle={this.formToggle}
                project={tasks.project._id}
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
                initialTime={tasks.project.initialTime}
                time={tasks.project.timeSpent}
              />
            </div>
          </div>
        </div>
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
