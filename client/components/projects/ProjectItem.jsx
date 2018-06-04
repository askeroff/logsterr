// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from '../../helpers';
import { IProject } from '../../types';

type Props = {
  project: IProject,
  onDelete: (projectId: string) => void,
  renameMe: (id: string, name: string) => void,
  padding: number,
};

type State = {
  showInput: boolean,
  newName: string,
};

class ProjectItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showInput: false,
      newName: '',
    };
  }

  renameLink: any;

  handleNewName = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ newName: e.currentTarget.value });
  };

  handleShowInput = (name: string) => {
    this.setState({
      showInput: !this.state.showInput,
      newName: name,
    });
  };

  handleRenaming = (id: string, name: string) => {
    this.props.renameMe(id, name);
    this.setState({
      showInput: false,
    });
  };

  handleEnterButton = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      this.renameLink.click();
    }
  };

  render() {
    const { project, onDelete } = this.props;
    const { newName, showInput } = this.state;
    const hideTaskName = this.state.showInput ? 'none' : '';
    return (
      <li
        style={{ paddingLeft: `${this.props.padding}px` }}
        className="projects__item"
      >
        <Link
          className="projects__item-title"
          style={{ display: `${hideTaskName}` }}
          to={`/projects/${project._id}`}
        >
          <span>{project.name}</span>
          <span className="pretty-time">{formatTime(project.timeSpent)}</span>
        </Link>
        {showInput ? (
          <input
            type="text"
            value={newName}
            className="name-input"
            onKeyPress={this.handleEnterButton}
            onChange={this.handleNewName}
          />
        ) : null}
        <div className="buttons-group">
          {showInput ? (
            <button
              onClick={() =>
                this.handleRenaming(project._id, this.state.newName)
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
            className="button--info"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(project._id)}
            className="button--info button--danger"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}

export default ProjectItem;
