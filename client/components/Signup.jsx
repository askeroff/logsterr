/* eslint react/no-array-index-key: off */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp } from '../actions/user';
import Layout from './layout/Layout';
import SignupForm from './layout/SignupForm';
import Spinner from './layout/Spinner';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      invite: '',
      errors: [],
      spinner: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/');
    }
    if (nextProps.user.errors && nextProps.user.errors.length > 0) {
      this.setState({ spinner: false, errors: nextProps.user.errors });
    }
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleInviteValue = event => {
    this.setState({ invite: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      spinner: true,
      errors: []
    });
    this.props.handleSignup({
      email: this.state.email,
      password: this.state.password,
      invite: this.state.invite
    });
  };

  renderErrors = () =>
    this.state.errors.map((message, index) => (
      <div key={index} className="server-response error">
        {message}
      </div>
    ));

  render() {
    return (
      <Layout>
        <h1 className="page-title">Signup Page</h1>
        <SignupForm
          myClassName="form__signup"
          handleSubmit={this.handleSubmit}
          emailValue={this.state.email}
          inviteValue={this.state.invite}
          handleInviteChange={this.handleInviteValue}
          passwordValue={this.state.password}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
        />
        <div>{this.renderErrors()}</div>
        {this.state.spinner ? <Spinner /> : null}
      </Layout>
    );
  }
}

Signup.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  handleSignup(user) {
    dispatch(signUp(user));
  }
});

export const UnwrappedSignup = Signup;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
