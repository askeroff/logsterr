import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logIn } from '../actions/user';
import LoginForm from './layout/LoginForm';
import Layout from './layout/Layout';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/');
    }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleLogin({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">Login Page</h1>
        <LoginForm
          myClassName="form signup"
          handleSubmit={this.handleSubmit}
          emailValue={this.state.email}
          passwordValue={this.state.password}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
        />
        <div
          ref={resultMessage => {
            this.resultMessage = resultMessage;
          }}
        />
      </Layout>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleLogin(user) {
    dispatch(logIn(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
