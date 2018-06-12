// @flow
import React from 'react';
import FormInput from './FormInput';

type Props = {
  myClassName: string,
  emailValue: string,
  passwordValue: string,
  handleEmailChange: (event: SyntheticEvent<HTMLInputElement>) => void,
  handlePasswordChange: (event: SyntheticEvent<HTMLInputElement>) => void,
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void
};

const LoginForm = (props: Props) => (
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
  passwordValue: '',
  handleEmailChange: null,
  handlePasswordChange: null,
  handleSubmit: null
};

export default LoginForm;
