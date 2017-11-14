import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '../actions/user';
import Home from './Home';

class Logout extends React.Component {
  componentDidMount() {
    this.props.logMeOut();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loggedIn === false) {
      this.props.history.push('/');
    }
  }

  render() {
    return <Home />;
  }
}

Logout.defaultProps = {
  user: {},
};

Logout.propTypes = {
  logMeOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logMeOut() {
    dispatch(logOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
