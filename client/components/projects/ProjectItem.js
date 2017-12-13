import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      newName: '',
    };
    this.handleNewName = this.handleNewName.bind(this);
    this.handleRenaming = this.handleRenaming.bind(this);
    this.handleShowInput = this.handleShowInput.bind(this);
    this.handleEnterButton = this.handleEnterButton.bind(this);
  }

  handleNewName(e) {
    this.setState({ newName: e.target.value });
  }

  handleShowInput(name) {
    this.setState({
      showInput: !this.state.showInput,
      newName: name,
    });
  }

  handleRenaming(id, name) {
    this.props.renameMe(id, name);
    this.setState({
      showInput: false,
    });
  }

  handleEnterButton(event) {
    if (event.charCode === 13) {
      this.renameLink.click();
    }
  }

  render() {
    const { project, onDelete } = this.props;
    const { newName, showInput } = this.state;
    const hideTaskName = this.state.showInput ? 'none' : '';
    return (
      <li className="projects-list-item">
        <Link
          className="project-list-title"
          style={{ display: `${hideTaskName}` }}
          to={`/projects/${project._id}`}
        >
          {project.name}
        </Link>
        {showInput ? (
          <input
            type="text"
            value={newName}
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
              className="info-button"
            >
              Ok
            </button>
          ) : null}
          <button
            onClick={() => this.handleShowInput(project.name)}
            className="info-button"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(project._id)}
            className="info-button danger-button"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  renameMe: PropTypes.func.isRequired,
};

export default ProjectItem;
