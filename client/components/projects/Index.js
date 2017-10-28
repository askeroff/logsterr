import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import Layout from '../layout/Layout';

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
    if (Object.keys(this.props.user).length === 0) {
      projects = '...';
    } else {
      projects = 'projects are loaded! well, not really. user is.';
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
};

Index.propTypes = {
  handleProjects: PropTypes.func.isRequired,
  user: PropTypes.object,
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
// test
