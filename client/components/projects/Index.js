import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects, addProject } from '../../actions/projects';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotLoggedIn from '../NotLoggedIn';
import ProjectsList from './ProjectsList';
import AddForm from './AddForm';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoaded: false,
      showForm: false,
      formInput: '',
      spinner: '',
    };
    this.showAddForm = this.showAddForm.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.addProject = this.addProject.bind(this);
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

  showAddForm() {
    this.setState({
      showForm: !this.state.showForm,
    });
  }

  handleFormInput(event) {
    this.setState({ formInput: event.target.value });
  }

  addProject(name) {
    this.props.handleAdding(name);
    this.setState({
      showForm: false,
      spinner: true,
      formInput: '',
    });
  }

  render() {
    let projects;
    const addLinkText = this.state.showForm ? 'Hide The Form' : 'Add New One';
    if (this.props.user && this.props.user.loggedIn === false) {
      return <NotLoggedIn />;
    }
    if (!this.props.projects) {
      projects = <Spinner />;
    } else {
      projects = (
        <ul className="projects-list">
          <ProjectsList projects={this.props.projects} />
        </ul>
      );
    }
    return (
      <Layout>
        <h1 className="page-title">Projects</h1>

        <a
          onClick={this.showAddForm}
          href="#"
          className="submit-button link-button"
        >
          {addLinkText}
        </a>

        {this.state.showForm ? (
          <AddForm
            inputValue={this.state.formInput}
            handleInput={this.handleFormInput}
            clickHandler={e => {
              e.preventDefault();
              this.addProject(this.state.formInput);
            }}
            labelName="Name Of Your New Project"
          />
        ) : null}
        {this.state.spinner ? <Spinner /> : null}
        {projects}
      </Layout>
    );
  }
}

Index.defaultProps = {
  user: {},
  projects: [],
};

Index.propTypes = {
  handleProjects: PropTypes.func.isRequired,
  handleAdding: PropTypes.func.isRequired,
  user: PropTypes.object,
  projects: PropTypes.array,
};

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
  handleAdding(name) {
    dispatch(addProject(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
