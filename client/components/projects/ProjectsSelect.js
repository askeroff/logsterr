import React from 'react';
import PropTypes from 'prop-types';

const ProjectsSelect = props => (
  <select
    name="parent_id"
    onChange={props.changeSelect}
    value={props.parentID}
  >
    <option value={''}>No Parent</option>
    {
      props.projects.map(item => (
        <option key={`select_project-${item._id}`} value={item._id}>{item.name}</option>))
    }
  </select>
);

ProjectsSelect.defaultProps = {
  parentID: ''
};

ProjectsSelect.propTypes = {
  projects: PropTypes.array.isRequired,
  parentID: PropTypes.any,
  changeSelect: PropTypes.func.isRequired,
};

export default ProjectsSelect;
