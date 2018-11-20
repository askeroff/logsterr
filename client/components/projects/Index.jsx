// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  getProjects,
  addProject,
  clearProjects,
  fetchProjects
} from '../../actions/projects';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import ProjectsList from './ProjectsList';
import AddForm from './AddForm';
import { IUser, IProject } from '../../types';

type State = {
  parentID: string,
  showForm: boolean,
  formInput: string,
  showArchived: boolean
};

type IndexProps = {
  handleProjects: () => void,
  handleAdding: (name: string, id: string) => void,
  clearProjectsList: () => void,
  user: IUser,
  projects: { list: IProject[], isFetching: boolean }
};

class Index extends React.Component<IndexProps, State> {
  static defaultProps = {
    user: {},
    projects: []
  };

  state = {
    parentID: '',
    showForm: false,
    formInput: '',
    showArchived: false
  };

  componentDidMount() {
    if (this.props.projects.isFetching === undefined) {
      this.props.clearProjectsList();
      this.props.handleProjects();
    }
  }

  getAddFormProps = () => ({
    inputValue: this.state.formInput,
    handleInput: this.handleFormInput,
    className: 'form form__newproject',
    clickHandler: e => {
      e.preventDefault();
      this.addProject(this.state.formInput, this.state.parentID);
    },
    changeSelect: e => {
      this.selectParent(e);
    },
    parentID: this.state.parentID,
    projects: this.props.projects.list,
    labelName: 'Name Of Your New Project'
  });

  selectParent = (event: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      parentID: event.currentTarget.value
    });
  };

  showAddForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  addProject = (name, id) => {
    this.props.handleAdding(name, id);
    this.setState({
      showForm: false,
      formInput: ''
    });
  };

  toggleArchived = () => {
    this.setState({
      showArchived: !this.state.showArchived
    });
  };

  handleFormInput = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ formInput: event.currentTarget.value });
  };

  render() {
    const addLinkText = this.state.showForm ? 'Hide The Form' : 'Add New One';
    const archivedText = this.state.showArchived
      ? 'Hide Archived Projects'
      : 'Show Archived Projects';

    const projects = (
      <ul className="projects__list">
        <ProjectsList
          showArchived={this.state.showArchived}
          projects={this.props.projects.list}
        />
      </ul>
    );

    return (
      <Layout>
        <div className="projects">
          <h1 className="page-title">Projects</h1>
          <div className="projects--topbuttons">
            <button onClick={this.showAddForm} className="button--submit">
              {addLinkText}
            </button>
            <button onClick={this.toggleArchived} className="button--submit">
              {archivedText}
            </button>
          </div>
          {this.state.showForm ? <AddForm {...this.getAddFormProps()} /> : null}
          {this.props.projects.isFetching ? <Spinner /> : null}
          {projects}
        </div>
      </Layout>
    );
  }
}

Index.defaultProps = {
  user: {},
  projects: {}
};

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  handleProjects() {
    dispatch(fetchProjects());
    dispatch(getProjects());
  },
  handleAdding(name, id) {
    dispatch(addProject(name, id));
  },
  clearProjectsList() {
    dispatch(clearProjects());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
