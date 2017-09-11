import React from 'react';
import Layout from './Layout';

class Signup extends React.Component {
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
    console.log('Form was submitted');
    event.preventDefault();
  }

  render() {
    return (
      <Layout>
        <h1>Signup Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Layout>
    );
  }
}

export default Signup;
