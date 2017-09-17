import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';

const LoginForm = props => (
  <form onSubmit={props.handleSubmit} className={props.myClassName}>
    <label htmlFor="email">E-mail:</label>
    <FormInput
      type="email"
      name="email"
      id="email"
      value={props.emailValue}
      onChange={props.handleEmailChange}
    />

    <label htmlFor="password">Password:</label>
    <FormInput
      type="password"
      name="password"
      id="password"
      value={props.passwordValue}
      onChange={props.handlePasswordChange}
    />
    <input type="submit" value="Submit" className="submit-button" />
  </form>
);

LoginForm.defaultProps = {
  myClassName: '',
  emailValue: '',
  handleEmailChange: null,
  passwordValue: '',
  handlePasswordChange: null,
  handleSubmit: null,
};

LoginForm.propTypes = {
  myClassName: PropTypes.string,
  emailValue: PropTypes.string,
  handleEmailChange: PropTypes.func,
  passwordValue: PropTypes.string,
  handlePasswordChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default LoginForm;
