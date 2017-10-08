import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div className="wrapper">
    <Header />
    {React.cloneElement(props.children, props)}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispachToProps)(Layout));
