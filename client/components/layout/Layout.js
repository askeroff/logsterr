import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../actions/user';
import Header from './Header';
import Footer from './Footer';
import Spinner from './Spinner';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    this.props.getUserData();
  }

  componentWillReceiveProps(nextProps) {
    if (
      Object.prototype.hasOwnProperty.call(nextProps.user, 'loggedIn') &&
      !this.state.loaded
    ) {
      this.setState({
        loaded: true,
      });
    }
  }

  render() {
    if (!this.state.loaded) {
      return <Spinner />;
    }
    return (
      <div className="wrapper">
        <Header userEmail={this.props.user.email} />
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
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUserData() {
    dispatch(isLoggedIn());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
