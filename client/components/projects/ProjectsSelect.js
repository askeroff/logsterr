import React from 'react';
import PropTypes from 'prop-types';

class ProjectsSelect extends React.Component {
  getListOfProjects = (parentID = '', level = 1) => {
    this.props.projects.forEach(project => {
      if (parentID === project.parent_id) {
        this.projects.push(
          <option
            key={`select_project-${project._id}`}
            value={project._id}
            dangerouslySetInnerHTML={{
              __html: '&nbsp'.repeat(level) + project.name,
            }}
          />
        );
        this.getListOfProjects(project._id, level + 3);
      }
    });
    return this.projects;
  };
  projects = [];

  render() {
    this.projects = [];
    const disabled = this.props.disableDefault;
    const listItems = this.getListOfProjects();
    return (
      <select
        name="parent_id"
        onChange={this.props.changeSelect}
        value={this.props.parentID}
        className={this.props.myClass}
      >
        <option disabled={disabled} value={''}>
          None
        </option>
        {listItems}
      </select>
    );
  }
}

ProjectsSelect.defaultProps = {
  parentID: '',
  disableDefault: false,
  myClass: 'project-select',
};

ProjectsSelect.propTypes = {
  projects: PropTypes.array.isRequired,
  parentID: PropTypes.any,
  disableDefault: PropTypes.bool,
  changeSelect: PropTypes.func.isRequired,
  myClass: PropTypes.string,
};

export default ProjectsSelect;
