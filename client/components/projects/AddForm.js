import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../layout/FormInput';
import ProjectsSelect from './ProjectsSelect';

const AddForm = props => (
  <form onSubmit={props.clickHandler} className="form form__newtask">
    <label className="form__title" htmlFor="project-name">
      {props.labelName}
    </label>
    {props.projects.length > 0 ? (
      <ProjectsSelect
        parentID={props.parentID}
        changeSelect={props.changeSelect}
        projects={props.projects}
      />
    ) : null}

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
  parentID: '',
  projects: [],
};

AddForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  projects: PropTypes.array,
  clickHandler: PropTypes.func,
  labelName: PropTypes.string.isRequired,
  parentID: PropTypes.any,
  changeSelect: PropTypes.func.isRequired,
};

export default AddForm;
