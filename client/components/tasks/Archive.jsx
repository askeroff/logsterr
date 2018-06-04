// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import { getTasks, clearTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotLoggedIn from '../NotLoggedIn';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import { IMatch, IProject, ITask, IUser } from '../../types';

type Props = {
  match: IMatch,
  projects: IProject[],
  tasks: ITask[],
  user: IUser,
  handleProjects: (userID: string) => void,
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

  constructor(props) {
    super(props);
    this.state = {
      currentProject: undefined,
      userLoaded: false,
      projectsLoaded: false,
      tasksLoaded: false,
      notFound: false
    };
  }

  componentDidMount() {
    this.props.clearTasksList();
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
    this.onUpdateProjects();
    this.onUpdateTasks();
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
    const { match, user, tasks } = this.props;
    const { currentProject } = this.state;
    const name = (currentProject && currentProject.name) || '...';
    if (user && user.loggedIn === false) {
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
    return (
      <Layout>
        <h1 className="page-title">{name}</h1>
        <div className="project--desc">
          <p>Archive of your finished tasks! </p>
          <Link to={`/projects/${match.params.id}`}>
            Go back to the project
          </Link>.
        </div>
        <TasksList filter projectId={match.params.id} tasks={tasks} />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user,
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
  handleTasks(projectId) {
    dispatch(getTasks(projectId));
  },
  clearTasksList() {
    dispatch(clearTasks());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
