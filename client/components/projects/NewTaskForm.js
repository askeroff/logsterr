import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../layout/FormInput';

const NewTaskForm = props => (
  <form method="post" className="form">
    <label htmlFor="project-name">{props.labelName}</label>
    <FormInput
      inputValue={props.inputValue}
      handleInput={props.handleInput}
      inputName="name"
    />
    <input type="hidden" value={props.parentProjectId} name="project" />
    <input type="submit" value="Add" className="submit-button" />
  </form>
);

NewTaskForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  parentProjectId: PropTypes.string.isRequired,
};

export default NewTaskForm;
