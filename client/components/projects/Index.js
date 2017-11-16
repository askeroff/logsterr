import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import Layout from '../layout/Layout';
import ProjectsList from './ProjectsList';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoaded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.user).length !== 0 && !this.state.userLoaded) {
      this.props.handleProjects(nextProps.user._id);
      this.setState({ userLoaded: true });
    }
  }

  render() {
    let projects;
    if (!this.props.projects.projectsList) {
      projects = 'There are no projects or they are loading.';
    } else {
      projects = (
        <ul className="projects-list">
          <ProjectsList />
        </ul>
      );
    }
    return (
      <Layout>
        <h1 className="page-title">Add A New Project</h1>

        <Link className="submit-button link-button" to="projects/add">
          Add
        </Link>

        {projects}
      </Layout>
    );
  }
}
Index.defaultProps = {
  user: {},
  projects: {},
};

Index.propTypes = {
  handleProjects: PropTypes.func.isRequired,
  user: PropTypes.object,
  projects: PropTypes.object,
};

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
