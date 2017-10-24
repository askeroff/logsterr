import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../layout/FormInput';

const AddForm = props => (
  <form method="post" className="form">
    <label htmlFor="project-name">Name of the project</label>
    <FormInput
      inputValue={props.inputValue}
      handleInput={props.handleInput}
      inputName="name"
    />
    <input type="submit" value="Add" className="submit-button" />
  </form>
);

AddForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default AddForm;
