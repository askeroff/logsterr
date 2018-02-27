import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logIn, forgot } from '../actions/user';
import LoginForm from './layout/LoginForm';
import ForgotForm from './layout/ForgotForm';
import Layout from './layout/Layout';
import Spinner from './layout/Spinner';

class Login extends React.Component {
  state = {
    email: '',
    forgotEmail: '',
    password: '',
    spinner: false,
  };

  componentDidMount() {
    this.props.user.error = '';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/');
    }

    if (nextProps.error !== '' && nextProps.error !== undefined) {
      this.setState({ spinner: false });
      this.resultMessage.innerHTML = nextProps.error;
    }
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleForgotEmailChange = event => {
    this.setState({ forgotEmail: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ spinner: true });
    this.resultMessage.innerHTML = '';
    this.props.handleLogin({
      email: this.state.email,
      password: this.state.password,
    });
  };

  handleForgotSubmit = event => {
    event.preventDefault();
    this.props.handleForgot(this.state.forgotEmail);
  };

  render() {
    return (
      <Layout>
        <h1 className="page-title">Login Page</h1>
        <LoginForm
          myClassName="form__login"
          handleSubmit={this.handleSubmit}
          emailValue={this.state.email}
          passwordValue={this.state.password}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
        />
        <div
          className="server-response"
          ref={resultMessage => {
            this.resultMessage = resultMessage;
          }}
        />
        {this.state.spinner ? <Spinner /> : null}
        <h2 className="page-title">Did you forget your password?</h2>
        <ForgotForm
          myClassName="form__login"
          emailValue={this.state.forgotEmail}
          handleEmailChange={this.handleForgotEmailChange}
          handleSubmit={this.handleForgotSubmit}
        />
      </Layout>
    );
  }
}

Login.defaultProps = {
  error: '',
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleForgot: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  handleLogin(user) {
    dispatch(logIn(user));
  },
  handleForgot(email) {
    dispatch(forgot(email));
  },
});

export const UnwrappedLogin = Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
