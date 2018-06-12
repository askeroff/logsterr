// @flow
import React from 'react';
import FormInput from './FormInput';

type Props = {
  myClassName: string,
  passwordValue: string,
  handlePasswordChange: (event: SyntheticEvent<HTMLInputElement>) => void,
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void
};

const ResetForm = (props: Props) => (
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
  handleSubmit: null
};

export default ResetForm;
