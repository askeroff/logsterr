import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../layout/FormInput';

const EditForm = props => (
  <form method="post" className="form">
    <label htmlFor="project-name">Name of the project</label>
    <input type="hidden" name="id" value={props.projectId} />
    <FormInput
      inputValue={props.inputValue}
      handleInput={props.handleInput}
      inputName="name"
    />
    <input type="submit" value="Edit" className="submit-button" />
  </form>
);

EditForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default EditForm;
