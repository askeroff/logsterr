import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LoginForm from './layout/LoginForm';

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
    axios
      .post('/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        if (res.data.result === 'error') {
          res.data.errors.map(msg => {
            this.resultMessage.innerHTML += `<div>${msg}</div>`;
            return msg;
          });
        } else if (res.data.result === 'success') {
          this.props.history.push('/');
        }
      })
      .catch(err => {
        this.resultMessage.innerHTML += `<div>${err}</div>`;
      });
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

Login.defaultProps = {
  history: {},
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
