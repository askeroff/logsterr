import React from 'react';
import PropTypes from 'prop-types';
import ProjectsSelect from '../../projects/ProjectsSelect';

const Input = props => (
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

Input.propTypes = {
  id: PropTypes.string.isRequired,
  editName: PropTypes.string.isRequired,
  categoryID: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  handleNameInput: PropTypes.func.isRequired,
  changeSelect: PropTypes.func.isRequired,
};

export default Input;
