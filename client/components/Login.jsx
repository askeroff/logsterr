// @flow
import React from 'react';
import { connect } from 'react-redux';
import { logIn, forgot } from '../actions/user';
import LoginForm from './layout/LoginForm';
import ForgotForm from './layout/ForgotForm';
import Layout from './layout/Layout';
import Spinner from './layout/Spinner';
import { IUser } from '../types';

type Props = {
  user: IUser,
  history: any,
  error: string,
  handleLogin: ({ email: string, password: string }) => void,
  handleForgot: (email: string) => void
};

type State = {
  email: string,
  forgotEmail: string,
  password: string,
  spinner: boolean,
  forgotSpinner: boolean
};

class Login extends React.Component<Props, State> {
  static defaultProps = {
    error: ''
  };
  state = {
    email: '',
    forgotEmail: '',
    password: '',
    spinner: false,
    forgotSpinner: false
  };

  componentDidMount() {
    this.props.user.error = '';
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.user.forgotResponse !== undefined) {
      this.setState({ forgotSpinner: false });
    }
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/');
    }

    if (nextProps.error !== '' && nextProps.error !== undefined) {
      this.setState({ spinner: false });
      if (this.resultMessage !== null) {
        this.resultMessage.innerHTML = nextProps.error;
      }
    }
  }

  resultMessage: HTMLDivElement | null;

  handleEmailChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };

  handleForgotEmailChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ forgotEmail: event.currentTarget.value });
  };

  handlePasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  };

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ spinner: true });
    if (this.resultMessage !== null) {
      this.resultMessage.innerHTML = '';
    }
    this.props.handleLogin({
      email: this.state.email,
      password: this.state.password
    });
  };

  handleForgotSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.handleForgot(this.state.forgotEmail);
    this.setState({ forgotSpinner: true });
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
        {this.state.forgotSpinner ? <Spinner /> : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  handleLogin(user) {
    dispatch(logIn(user));
  },
  handleForgot(email) {
    dispatch(forgot(email));
  }
});

export const UnwrappedLogin = Login;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
