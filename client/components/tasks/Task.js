import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatTime } from '../../helpers';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: '',
      showInput: false,
    };
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleShowInput = this.handleShowInput.bind(this);
    this.handleEnterButton = this.handleEnterButton.bind(this);
  }

  handleNameInput(e) {
    this.setState({ editName: e.target.value });
  }

  handleShowInput(name) {
    this.setState({
      showInput: !this.state.showInput,
      editName: name,
    });
  }

  handleRenaming(id, name) {
    this.props.handleRename(id, name);
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
    const { editName, showInput } = this.state;
    const { id, handleDelete, name, taskDone, done } = this.props;
    const doneButtonValue = done ? 'Undone' : 'Done';
    const hideOrNot = showInput ? 'none' : '';
    const newDate = this.props.updated ? formatDate(this.props.updated) : '';
    const dateString = this.props.updated ? 'Done:' : '';
    return (
      <li className="projects-list-item">
        <span style={{ display: hideOrNot }} className="task-name">
          {name}(<strong>{formatTime(this.props.timeSpent)})</strong>
        </span>
        {dateString !== '' ? (
          <span>
            <strong>{dateString} </strong>
            {newDate}
          </span>
        ) : null}

        {showInput ? (
          <input
            type="text"
            onKeyPress={this.handleEnterButton}
            value={editName}
            onChange={this.handleNameInput}
          />
        ) : null}

        <div className="buttons-group">
          {showInput ? (
            <a
              href="#"
              onClick={() => this.handleRenaming(id, editName)}
              ref={link => {
                this.renameLink = link;
              }}
              className="info-button link"
            >
              Ok
            </a>
          ) : null}

          {!showInput ? (
            <a
              href="#"
              onClick={() => this.handleShowInput(name)}
              className="info-button link"
            >
              Edit
            </a>
          ) : null}
          <a href="#" onClick={() => taskDone(id)} className="info-button link">
            {doneButtonValue}
          </a>

          <a
            href="#"
            onClick={() => handleDelete(id)}
            className="danger-button link"
          >
            Delete
          </a>
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  updated: undefined,
};

Task.propTypes = {
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
  taskDone: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  updated: PropTypes.string,
  timeSpent: PropTypes.number.isRequired,
};

export default Task;
