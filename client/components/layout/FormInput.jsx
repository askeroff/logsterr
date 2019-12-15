// @flow
import React from 'react';

type Props = {
  inputType: string,
  inputName: string,
  inputId: string,
  inputValue: string,
  handleInput: (e: SyntheticEvent<HTMLInputElement>) => void
};

const FormInput = (props: Props) => (
  <input
    type={props.inputType}
    name={props.inputName}
    id={props.inputId}
    className="text-field"
    value={props.inputValue}
    onChange={props.handleInput}
  />
);

FormInput.defaultProps = {
  inputType: 'text',
  inputName: '',
  inputId: '',
  inputValue: '',
  handleInput: null
};

export default FormInput;
