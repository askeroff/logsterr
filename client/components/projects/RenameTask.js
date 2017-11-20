import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../layout/FormInput';

const RenameTask = props => (
  <form method="post" className="form edit-form">
    <FormInput
      inputValue={props.inputValue}
      handleInput={props.handleInput}
      inputName="name"
    />
    <input
      onClick={props.handleSubmit}
      type="button"
      value="Ok"
      className="rename-button"
    />
  </form>
);

RenameTask.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default RenameTask;
