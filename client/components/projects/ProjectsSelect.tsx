
import * as React from 'react';
import { Project } from '../../types';

interface Props {
  projects: Project[],
  parentID: string,
  disableItself?: boolean,
  itselfID?: string,
  disableDefault: boolean,
  changeSelect: (e: any) => void,
  myClass: string,
  defaultOption?: string
}

class ProjectsSelect extends React.Component<Props> {
  static defaultProps = {
    parentID: '',
    disableDefault: false,
    myClass: 'project-select'
  };

  getListOfProjects = (parentID: string = '', level: number = 1) => {
    const children = this.getAllChildren(this.props.itselfID);
    this.props.projects.forEach(project => {
      let disabled = false;
      const isChild = children.indexOf(project._id) !== -1;
      const disableItself =
        (this.props.disableItself && this.props.itselfID === project._id);
      if (isChild || disableItself) {
        disabled = true;
      }
      if (parentID === project.parent_id && !project.done) {
        this.projects.push(
          <option
            key={`select_project-${project._id}`}
            value={project._id}
            disabled={disabled}
            dangerouslySetInnerHTML={{
              __html: '&nbsp'.repeat(level) + project.name
            }}
          />
        );
        this.getListOfProjects(project._id, level + 3);
      }
    });
    return this.projects;
  };

  getAllChildren = (myID?: string): string[] => {
    if (myID === undefined) {
      return [];
    }
    const children = [];
    const recursive = (id: string) => {
      this.props.projects.forEach(project => {
        if (id === project.parent_id) {
          children.push(project._id);
          recursive(project._id);
        }
      });
    };
    recursive(myID);
    return children;
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
          {this.props.defaultOption || 'None'}
        </option>
        {listItems}
      </select>
    );
  }
}

export default ProjectsSelect;
