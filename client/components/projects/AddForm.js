import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../layout/FormInput';

const AddForm = props => (
  <form method="post" className="form">
    <label htmlFor="project-name">{props.labelName}</label>
    <FormInput
      inputValue={props.inputValue}
      handleInput={props.handleInput}
      inputName="name"
    />
    <input
      onClick={props.clickHandler}
      type="button"
      value="Add"
      className="submit-button"
    />
  </form>
);

AddForm.defaultProps = {
  clickHandler: () => 0,
};

AddForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  clickHandler: PropTypes.func,
  labelName: PropTypes.string.isRequired,
};

export default AddForm;
