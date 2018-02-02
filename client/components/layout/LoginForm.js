import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';

const LoginForm = props => (
  <form onSubmit={props.handleSubmit} className={props.myClassName}>
    <label htmlFor="email">E-mail:</label>
    <FormInput
      inputType="email"
      inputName="email"
      inputId="email"
      inputValue={props.emailValue}
      handleInput={props.handleEmailChange}
    />

    <label htmlFor="password">Password:</label>
    <FormInput
      inputType="password"
      inputName="password"
      inputId="password"
      inputValue={props.passwordValue}
      handleInput={props.handlePasswordChange}
    />
    <input type="submit" value="Submit" className="button--submit" />
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
