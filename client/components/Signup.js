/* eslint react/no-array-index-key: off */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp } from '../actions/user';
import Layout from './layout/Layout';
import LoginForm from './layout/LoginForm';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/');
    }
    if (nextProps.user.errors && nextProps.user.errors.length > 0) {
      this.setState({ errors: nextProps.user.errors });
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
    this.props.handleSignup({
      email: this.state.email,
      password: this.state.password,
    });
  }

  renderErrors() {
    return this.state.errors.map((message, index) => (
      <div key={index} className="server-response error">
        {message}
      </div>
    ));
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">Signup Page</h1>
        <LoginForm
          myClassName="form signup"
          handleSubmit={this.handleSubmit}
          emailValue={this.state.email}
          passwordValue={this.state.password}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
        />
        <div>{this.renderErrors()}</div>
      </Layout>
    );
  }
}

Signup.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleSignup(user) {
    dispatch(signUp(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
