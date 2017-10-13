import React from 'react';
import PropTypes from 'prop-types';

const FormInput = props => (
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
  handleInput: null,
};

FormInput.propTypes = {
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  inputId: PropTypes.string,
  inputValue: PropTypes.string,
  handleInput: PropTypes.func,
};

export default FormInput;
