import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Layout from './Layout';

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
      .then((res) => {
        if (res.data.result === 'error') {
          res.data.errors.map((msg) => {
            this.errorMessage.innerHTML += `<div>${msg}</div>`;
            return msg;
          });
        } else if (res.data.result === 'success') {
          this.props.history.push('/');
        }
      })
    .catch((err) => {
      this.errorMessage.innerHTML += `<div>${err}</div>`;
    });
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">Login Page</h1>
        <form onSubmit={this.handleSubmit} className="form signup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="text-field"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="text-field"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />


          <input type="submit" value="Log In!" className="submit-button" />
        </form>
        <div ref={(errorMessage) => { this.errorMessage = errorMessage; }} />
      </Layout>
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
