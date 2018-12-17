// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from '../../helpers';
import ProjectsSelect from './ProjectsSelect';
import { IProject } from '../../types';

type Props = {
  project: IProject,
  projectsList: IProject[],
  onDelete: (projectId: string) => void,
  renameMe: (id: string, name: string, parentId: string) => void,
  toggleDone: (id: string) => void,
  padding: number
};

type State = {
  showInput: boolean,
  newName: string,
  parentID: string
};

class ProjectItem extends React.Component<Props, State> {
  state = {
    showInput: false,
    newName: '',
    parentID: this.props.project.parent_id
  };

  renameLink: any;

  handleNewName = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ newName: e.currentTarget.value });
  };

  handleShowInput = (name: string) => {
    this.setState({
      showInput: !this.state.showInput,
      newName: name
    });
  };

  handleRenaming = (id: string, name: string, parentID: string) => {
    this.props.renameMe(id, name, parentID);

    this.setState({
      showInput: false
    });
  };

  handleEnterButton = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      this.renameLink.click();
    }
  };

  changeSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      parentID: e.currentTarget.value
    });
  };

  shouldShowInput = () => {
    if (this.state.showInput) {
      return (
        <div className="project-name">
          <input
            type="text"
            value={this.state.newName}
            className="name-input"
            onKeyPress={this.handleEnterButton}
            onChange={this.handleNewName}
          />
          <ProjectsSelect
            disableItself
            itselfID={this.props.project._id}
            parentID={this.state.parentID}
            projects={this.props.projectsList}
            changeSelect={this.changeSelect}
            defaultOption="No Parent"
          />
        </div>
      );
    }
    return null;
  };

  render() {
    const { project, onDelete } = this.props;
    const { showInput, parentID } = this.state;
    const hideTaskName = showInput ? 'none' : '';
    const hideButtons = showInput ? 'hide' : '';
    const editClassName = showInput ? 'projects__item--edit' : '';
    const parentClassName = parentID === '' ? 'project__item--parent' : '';
    return (
      <li
        style={{ marginLeft: `${this.props.padding}px` }}
        className={`projects__item ${editClassName} ${parentClassName}`.trim()}
      >
        <Link
          className="projects__item-title"
          style={{ display: `${hideTaskName}` }}
          to={`/projects/${project._id}`}
        >
          <span>{project.name}</span>
          <span className="pretty-time">{formatTime(project.timeSpent)}</span>
        </Link>
        {this.shouldShowInput()}
        <div className="buttons-group">
          {showInput ? (
            <button
              onClick={() =>
                this.handleRenaming(
                  project._id,
                  this.state.newName,
                  this.state.parentID
                )
              }
              ref={link => {
                this.renameLink = link;
              }}
              className="button--info"
            >
              Ok
            </button>
          ) : null}
          <button
            onClick={() => this.handleShowInput(project.name)}
            className={`button--info button--small ${hideButtons}`}
          >
            <span aria-label="edit" role="img">
              ✎
            </span>
          </button>

          <button
            title={'Mark this project done'}
            onClick={() => this.props.toggleDone(project._id)}
            className={`button--info button--small ${hideButtons}`}
          >
            <span aria-label="mark done" role="img">
              ✔
            </span>
          </button>

          <button
            onClick={() => onDelete(project._id)}
            className={`button--info button-danger button--small ${hideButtons}`}
          >
            <span aria-label="delete" role="img">
              ✕
            </span>
          </button>
        </div>
      </li>
    );
  }
}

export default ProjectItem;
