// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getProjects, addProject, clearProjects } from '../../actions/projects';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotLoggedIn from '../NotLoggedIn';
import ProjectsList from './ProjectsList';
import AddForm from './AddForm';
import { IUser, IProject } from '../../types';

type State = {
  userLoaded: boolean,
  parentID: string,
  showForm: boolean,
  formInput: string,
  spinner: boolean,
};

type IndexProps = {
  handleProjects: (authorID: string) => void,
  handleAdding: (name: string, id: string) => void,
  clearProjectsList: () => void,
  user: IUser,
  projects: IProject[],
};

class Index extends React.Component<IndexProps, State> {
  static defaultProps = {
    user: {},
    projects: [],
  };

  state = {
    userLoaded: false,
    parentID: '',
    showForm: false,
    formInput: '',
    spinner: false,
  };

  componentDidMount() {
    this.props.clearProjectsList();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.spinner === true &&
      nextProps.projects.length > this.props.projects.length
    ) {
      this.setState({ spinner: false });
    }
    if (
      nextProps.user &&
      nextProps.user.loggedIn === true &&
      !this.state.userLoaded
    ) {
      this.props.handleProjects(nextProps.user._id);
      this.setState({ userLoaded: true });
    }
  }

  showAddForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };

  handleFormInput = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ formInput: event.currentTarget.value });
  };

  addProject = (name, id) => {
    this.props.handleAdding(name, id);
    this.setState({
      showForm: false,
      spinner: true,
      formInput: '',
    });
  };

  selectParent = (event: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      parentID: event.currentTarget.value,
    });
  };

  render() {
    let projects;
    const addLinkText = this.state.showForm ? 'Hide The Form' : 'Add New One';
    if (this.props.user && this.props.user.loggedIn === false) {
      return <NotLoggedIn />;
    }
    if (!this.state.userLoaded) {
      projects = <Spinner />;
    } else {
      projects = (
        <ul className="projects__list">
          <ProjectsList projects={this.props.projects} />
        </ul>
      );
    }
    return (
      <Layout>
        <div className="projects">
          <h1 className="page-title">Projects</h1>

          <button onClick={this.showAddForm} className="button--submit">
            {addLinkText}
          </button>

          {this.state.showForm ? (
            <AddForm
              inputValue={this.state.formInput}
              handleInput={this.handleFormInput}
              className="form form__newproject"
              clickHandler={e => {
                e.preventDefault();
                this.addProject(this.state.formInput, this.state.parentID);
              }}
              changeSelect={e => {
                this.selectParent(e);
              }}
              parentID={this.state.parentID}
              projects={this.props.projects}
              labelName="Name Of Your New Project"
            />
          ) : null}
          {this.state.spinner ? <Spinner /> : null}
          {projects}
        </div>
      </Layout>
    );
  }
}

Index.defaultProps = {
  user: {},
  projects: [],
};

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
  handleAdding(name, id) {
    dispatch(addProject(name, id));
  },
  clearProjectsList() {
    dispatch(clearProjects());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
