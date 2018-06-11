// @flow
import React from 'react';
import FormInput from './FormInput';

type Props = {
  myClassName: string,
  emailValue: string,
  handleEmailChange: (event: SyntheticEvent<HTMLInputElement>) => void,
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void
};

const ForgotForm = (props: Props) => (
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
  handlePasswordChange: null,
  handleSubmit: null
};

export default ForgotForm;
