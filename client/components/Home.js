import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import Dashboard from './dashboard/Index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loggedIn === true) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">Home Page</h1>
        {this.state.loggedIn ? <Dashboard /> : null}
      </Layout>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
