import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';

const ForgotForm = props => (
  <form onSubmit={props.handleSubmit} className={props.myClassName}>
    <label htmlFor="email">E-mail:</label>
    <FormInput
      inputType="email"
      inputName="forgot-email"
      inputId="forgot-email"
      inputValue={props.emailValue}
      handleInput={props.handleEmailChange}
    />
    <input type="submit" value="Send a Reset" className="button--submit" />
  </form>
);

ForgotForm.defaultProps = {
  myClassName: '',
  emailValue: '',
  handleEmailChange: null,
  passwordValue: '',
  handlePasswordChange: null,
  handleSubmit: null,
};

ForgotForm.propTypes = {
  myClassName: PropTypes.string,
  emailValue: PropTypes.string,
  handleEmailChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default ForgotForm;
