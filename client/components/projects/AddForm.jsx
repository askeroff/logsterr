// @flow
import React from 'react';
import FormInput from '../layout/FormInput';
import ProjectsSelect from './ProjectsSelect';
import { IProject } from '../../types';

type AddFormProps = {
  inputValue: string,
  handleInput: (e: SyntheticEvent<HTMLInputElement>) => void,
  projects: IProject[],
  clickHandler: (e: SyntheticEvent<HTMLFormElement>) => void,
  labelName: string,
  parentID: string,
  changeSelect: (e: SyntheticEvent<HTMLSelectElement>) => void,
  className: string
};

const AddForm = (props: AddFormProps) => (
  <form onSubmit={props.clickHandler} className={props.className}>
    <label className="form__title" htmlFor="project-name">
      {props.labelName}
    </label>
    {props.projects.length > 0 ? (
      <ProjectsSelect
        parentID={props.parentID}
        myClass={''}
        defaultOption="No Parent"
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
  clickHandler: () => {},
  changeSelect: () => {},
  parentID: '',
  projects: [],
  className: 'form'
};

export default AddForm;
