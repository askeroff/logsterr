import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import Dashboard from './dashboard/Index';
import Spinner from './layout/Spinner';

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
    } else if (nextProps.user.loggedIn === false) {
      this.props.history.push('/login');
    }
  }

  shouldRender() {
    if (this.state.loggedIn) {
      return <Dashboard />;
    }
    return <Spinner />;
  }

  render() {
    return (
      <Layout>
        {this.shouldRender()}
      </Layout>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
