import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../layout/FormInput';

const AddForm = props => (
  <form onSubmit={props.clickHandler} className="form form__newtask">
    <label className="form__title" htmlFor="project-name">
      {props.labelName}
    </label>
    <FormInput
      inputValue={props.inputValue}
      handleInput={props.handleInput}
      inputName="name"
    />
    <input type="submit" value="Add" className="button--submit" />
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
