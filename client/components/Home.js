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
        {this.state.loggedIn ? <Dashboard /> : <h1>Home Page</h1>}
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
