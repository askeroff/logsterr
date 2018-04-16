// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ProjectsSelect from '../../projects/ProjectsSelect';

type Props = {
  id: string,
  editName: string,
  categoryID: string,
  projects: string,
  handleNameInput: () => void,
  changeSelect: () => void,
};

const Input = (props: Props) => (
  <div className="tasks__list-input">
    <input
      type="text"
      onKeyPress={e => {
        if (e.charCode === 13) {
          this.handleEnterButton(props.id, props.editName, props.categoryID);
        }
      }}
      value={props.editName}
      onChange={props.handleNameInput}
    />
    <ProjectsSelect
      disableDefault
      parentID={props.categoryID}
      projects={props.projects}
      changeSelect={props.changeSelect}
    />
  </div>
);

export default Input;
