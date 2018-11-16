// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import { getTasks, clearTasks, fetchTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import { IMatch, IProject, IUser } from '../../types';

type Props = {
  match: IMatch,
  projects: IProject[],
  // tasks: { list: ITask[] },
  user: IUser,
  handleProjects: () => void,
  handleTasks: (projectID: string) => void,
  clearTasksList: () => void
};

type State = {
  currentProject?: IProject,
  userLoaded: boolean,
  projectsLoaded: boolean,
  tasksLoaded: boolean,
  notFound: boolean
};

class Archive extends React.Component<Props, State> {
  static defaultProps = {
    projects: [],
    tasks: [],
    user: {}
  };

  state = {
    currentProject: undefined,
    userLoaded: false,
    projectsLoaded: false,
    tasksLoaded: false,
    notFound: false
  };

  componentDidMount() {
    this.props.clearTasksList();
  }

  componentDidUpdate() {
    this.onUpdateProjects();
    this.onUpdateTasks();
    if (this.props.user.loggedIn && !this.state.userLoaded) {
      this.props.handleProjects();
      this.setState({ userLoaded: true });
    }
  }

  onUpdateProjects = () => {
    if (this.props.projects.length !== 0 && !this.state.projectsLoaded) {
      this.props.projects.forEach(item => {
        if (item._id === this.props.match.params.id) {
          this.setState({ currentProject: item, projectsLoaded: true });
        }
        return item;
      });
      this.setState({ projectsLoaded: true });
    }
  };

  onUpdateTasks = () => {
    const { projectsLoaded, currentProject } = this.state;
    if (
      projectsLoaded &&
      currentProject === undefined &&
      this.state.notFound === false
    ) {
      this.setState({ notFound: true });
    }

    if (
      projectsLoaded &&
      currentProject !== undefined &&
      !this.state.tasksLoaded
    ) {
      this.props.handleTasks(this.props.match.params.id);
      this.setState({ tasksLoaded: true });
    }
  };

  render() {
    const { match } = this.props;
    const { currentProject } = this.state;
    const name = (currentProject && currentProject.name) || '...';

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
    return (
      <Layout>
        <h1 className="page-title">{name}</h1>
        <div className="project--desc">
          <p>Archive of your finished tasks! </p>
          <Link to={`/projects/${match.params.id}`}>
            Go back to the project
          </Link>
          .
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
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  handleProjects() {
    dispatch(getProjects());
  },
  handleTasks(projectId) {
    dispatch(fetchTasks());
    dispatch(getTasks(projectId, true));
  },
  clearTasksList() {
    dispatch(clearTasks());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);
