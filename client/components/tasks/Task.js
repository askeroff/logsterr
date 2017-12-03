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

  render() {
    const { editName, showInput } = this.state;
    const { id, handleDelete, name, taskDone, done } = this.props;
    const doneButtonValue = done ? 'Undone' : 'Done';
    const newDate = this.props.updated ? formatDate(this.props.updated) : '';
    const dateString = this.props.updated ? 'Done:' : '';

    return (
      <li className="projects-list-item">
        <span className="task-name">
          {name} (<strong>{formatTime(this.props.timeSpent)}</strong>)
        </span>
        <span>
          <strong>{dateString} </strong>
          {newDate}
        </span>
        {showInput ? (
          <input type="text" value={editName} onChange={this.handleNameInput} />
        ) : null}
        <div className="buttons-group">
          {showInput ? (
            <input
              onClick={() => this.handleRenaming(id, this.state.editName)}
              type="button"
              value="Ok"
            />
          ) : null}

          {!showInput ? (
            <button onClick={() => this.handleShowInput(name)}>Rename</button>
          ) : null}
          <button onClick={() => taskDone(id)}>{doneButtonValue}</button>

          <button onClick={() => handleDelete(id)} className="delete sign">
            Delete
          </button>
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
