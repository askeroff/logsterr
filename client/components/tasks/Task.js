import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { formatDate, formatTime } from '../../helpers';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: '',
      showInput: false,
      showTimer: false,
    };
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleShowInput = this.handleShowInput.bind(this);
    this.handleEnterButton = this.handleEnterButton.bind(this);
    this.showTimer = this.showTimer.bind(this);
  }

  showTimer() {
    this.setState(state => ({
      showTimer: !state.showTimer,
    }));
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
    const { editName, showInput, showTimer } = this.state;
    const {
      id,
      handleDelete,
      name,
      taskDone,
      done,
      handleAddingTimeLog,
      projectId,
    } = this.props;
    const TimerComponent = showTimer ? (
      <Timer
        key={`timer${id}`}
        id={id}
        taskName={name}
        project={projectId}
        handleAddingTimeLog={handleAddingTimeLog}
      />
    ) : null;
    const doneButtonValue = done ? 'Undone' : 'Done';
    const doneClass = done ? 'projects-list-item--done' : 'projects-list-item';
    const hideOrNot = showInput ? 'none' : '';
    const newDate = this.props.updated ? formatDate(this.props.updated) : '';
    const dateString = this.props.updated ? 'Done:' : '';
    return (
      <li className={`${doneClass}`}>
        <span style={{ display: hideOrNot }} className="task-name">
          {name}(<strong>{formatTime(this.props.timeSpent)})</strong>
        </span>
        {dateString !== '' ? (
          <span className="done-date">
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
          {!done ? (
            <button onClick={this.showTimer} className="info-button">
              Timer
            </button>
          ) : null}
          {showInput ? (
            <button
              onClick={() => this.handleRenaming(id, editName)}
              ref={link => {
                this.renameLink = link;
              }}
              className="info-button"
            >
              Ok
            </button>
          ) : null}

          {!showInput ? (
            <button
              onClick={() => this.handleShowInput(name)}
              className="info-button"
            >
              Edit
            </button>
          ) : null}
          <button onClick={() => taskDone(id)} className="info-button">
            {doneButtonValue}
          </button>

          <button
            onClick={() => handleDelete(id)}
            className="info-button danger-button"
          >
            Delete
          </button>
        </div>
        {done ? null : TimerComponent}
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
  handleAddingTimeLog: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default Task;
