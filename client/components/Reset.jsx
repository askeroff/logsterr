import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReset, postReset } from '../actions/user';
import Layout from './layout/Layout';
import ResetForm from './layout/ResetForm';
import Spinner from './layout/Spinner';

class Reset extends React.Component {
  state = {
    message: 'Checking your token for validity...',
    resetPassword: '',
    resetMessage: '',
    spinner: false
  };

  componentDidMount() {
    this.props.handleGetReset(this.props.match.params.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getReset === true) {
      this.setState({
        message: '',
        spinner: false,
      });
    } else if (nextProps.getReset === false) {
      this.setState({
        spinner: false,
        message: 'Your token is invalid. It might be expired',
      });
    }

    this.setState({
      resetMessage: nextProps.resetMessage || '',
    });

    if (nextProps.postReset === true) {
      this.props.history.push('/login');
    }
  }

  handlePasswordChange = event => {
    this.setState({
      resetPassword: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ spinner: true });
    this.props.handlePostReset(
      this.props.match.params.token,
      this.state.resetPassword
    );
  };

  render() {
    return (
      <Layout showToGuests>
        <h1 className="page-title">Reset Password</h1>
        {this.state.message === '' ? (
          <ResetForm
            myClassName="form__login"
            passwordValue={this.state.resetPassword}
            handlePasswordChange={this.handlePasswordChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
            this.state.message
          )}
        <span>{this.state.resetMessage}</span>
        {this.state.spinner ? <Spinner /> : null}
      </Layout>
    );
  }
}

Reset.defaultProps = {
  getReset: false,
  resetMessage: '',
  postReset: false,
};

Reset.propTypes = {
  handleGetReset: PropTypes.func.isRequired,
  handlePostReset: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getReset: PropTypes.bool,
  resetMessage: PropTypes.string,
  postReset: PropTypes.bool,
};

const mapStateToProps = state => ({
  getReset: state.user.getReset,
  resetMessage: state.user.resetMessage,
  postReset: state.user.postReset,
});

const mapDispatchToProps = dispatch => ({
  handleGetReset(token) {
    dispatch(getReset(token));
  },
  handlePostReset(token, password) {
    dispatch(postReset(token, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
