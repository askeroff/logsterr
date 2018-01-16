import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import ButtonsGroup from './ButtonsGroup';
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

  handleEnterButton(id, name) {
    this.props.handleRename(id, name);
    this.setState({
      showInput: false,
    });
  }

  render() {
    const { editName, showInput, showTimer } = this.state;
    const { id, name, done, handleAddingTimeLog, projectId } = this.props;
    const TimerComponent = showTimer ? (
      <Timer
        key={`timer${id}`}
        id={id}
        taskName={name}
        project={projectId}
        handleAddingTimeLog={handleAddingTimeLog}
      />
    ) : null;
    const doneButtonValue = done ? 'undone' : 'done';
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
            onKeyPress={e => {
              if (e.charCode === 13) {
                this.handleEnterButton(id, editName);
              }
            }}
            value={editName}
            className="name-input"
            onChange={this.handleNameInput}
          />
        ) : null}

        <ButtonsGroup
          {...this.props}
          {...this.state}
          showTimer={this.showTimer}
          handleShowInput={this.handleShowInput}
          handleRenaming={() => this.handleRenaming(id, editName)}
          doneButtonValue={doneButtonValue}
        />
        {done ? null : TimerComponent}
      </li>
    );
  }
}

Task.defaultProps = {
  updated: undefined,
  projectId: '',
  handleAddingTimeLog: null,
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
  handleAddingTimeLog: PropTypes.func,
  projectId: PropTypes.string,
};

export default Task;
