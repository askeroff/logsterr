
import * as React from 'react';
import FormInput from './FormInput';

interface Props {
  myClassName: string;
  emailValue: string;
  handleEmailChange: (event: any) => void;
  handleSubmit: (event: any) => void;
}

const ForgotForm = (props: Props): JSX.Element => (
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
