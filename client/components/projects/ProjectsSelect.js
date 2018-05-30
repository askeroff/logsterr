// @flow
import React from 'react';
import { IProject } from '../../types';

type Props = {
  projects: IProject[],
  parentID: string,
  disableDefault: boolean,
  changeSelect: (e: SyntheticEvent<HTMLSelectElement>) => void,
  myClass: string,
};

class ProjectsSelect extends React.Component<Props> {
  static defaultProps = {
    parentID: '',
    disableDefault: false,
    myClass: 'project-select',
  };

  getListOfProjects = (parentID: string = '', level: number = 1) => {
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

export default ProjectsSelect;
