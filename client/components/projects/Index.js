import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import Layout from '../layout/Layout';

class Index extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.handleProjects('sdasdasd32142');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">Add A New Project</h1>

        <Link className="submit-button link-button" to="projects/add">
          Add
        </Link>
      </Layout>
    );
  }
}

Index.propTypes = {
  handleProjects: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
