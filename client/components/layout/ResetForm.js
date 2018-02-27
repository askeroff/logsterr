import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';

const ResetForm = props => (
  <form onSubmit={props.handleSubmit} className={props.myClassName}>
    <label htmlFor="password">Your New Password:</label>
    <FormInput
      inputType="password"
      inputName="password-email"
      inputId="password-email"
      inputValue={props.passwordValue}
      handleInput={props.handlePasswordChange}
    />
    <input type="submit" value="Change Password" className="button--submit" />
  </form>
);

ResetForm.defaultProps = {
  myClassName: '',
  passwordValue: '',
  handlePasswordChange: null,
  handleSubmit: null,
};

ResetForm.propTypes = {
  myClassName: PropTypes.string,
  passwordValue: PropTypes.string,
  handlePasswordChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default ResetForm;
