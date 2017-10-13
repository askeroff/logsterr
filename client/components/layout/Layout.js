import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageLoad } from '../../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    return (
      <div className="wrapper">
        <Header userEmail={this.props.user.email} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userData,
});

const mapDispatchToProps = dispatch => ({
  getUserData() {
    dispatch(pageLoad());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
