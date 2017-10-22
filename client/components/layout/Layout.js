import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut, isLoggedIn } from '../../actions/user';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    return (
      <div className="wrapper">
        <Header logOut={this.props.logOut} userEmail={this.props.user.email} />
        <div className="content-wrapper">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUserData() {
    dispatch(isLoggedIn());
  },
  logOut() {
    dispatch(logOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
