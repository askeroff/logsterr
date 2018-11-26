// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import { getTasks, fetchTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';
import { IMatch, IUser } from '../../types';

type Props = {
  match: IMatch,
  user: IUser,
  handleProjects: () => void,
  handleTasks: (projectID: string) => void
};

class Archive extends React.Component<Props> {
  static defaultProps = {
    projects: [],
    tasks: [],
    user: {}
  };

  isReady = false;

  componentDidMount() {
    const projectTasks = this.props.tasks.list.find(
      item => item.project._id === this.props.match.params.id
    );
    if (projectTasks && projectTasks.doneList !== undefined) {
      this.isReady = true;
    }
  }

  componentDidUpdate() {
    if (this.props.user.loggedIn && !this.isReady) {
      this.props.handleProjects();
      this.props.handleTasks(this.props.match.params.id);
      this.isReady = true;
    }
  }

  componentWillUnmount() {
    this.isReady = false;
  }

  render() {
    const { tasks, match } = this.props;
    const projectTasks = tasks.list.find(
      item => item.project._id === this.props.match.params.id
    );
    const showSpinner =
      (tasks.isFetching || !this.isReady) &&
      (projectTasks && projectTasks.doneList) === undefined;

    if (projectTasks === undefined && !showSpinner) {
      return <NotFound />;
    }

    return (
      <Layout showSpinner={showSpinner}>
        {projectTasks && projectTasks.doneList ? (
          <React.Fragment>
            <h1 className="page-title">{projectTasks.project.name}</h1>
            <div className="project--desc">
              <p>Archive of your finished tasks! </p>
              <Link to={`/projects/${match.params.id}`}>
                Go back to the project
              </Link>
              .
            </div>

            <TasksList
              tasks={projectTasks}
              showDone
              projectId={this.props.match.params.id}
            />
          </React.Fragment>
        ) : null}
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);
