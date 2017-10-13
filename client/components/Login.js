import React from 'react';
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

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
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

export default Login;
