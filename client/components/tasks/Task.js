import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../helpers';

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
    const spanClassName = done ? 'strikethrough' : '';
    const doneButtonValue = done ? 'Undone' : 'Done';
    const hideTaskName = this.state.showInput ? 'none' : '';
    const newDate = this.props.updated
      ? formatDate(this.props.updated)
      : formatDate(this.props.created);
    const dateString = this.props.updated ? 'Updated:' : 'Created:';

    return (
      <li className="projects-list-item">
        <span
          style={{ display: `${hideTaskName}` }}
          className={`task-name ${spanClassName}`}
        >
          {name} (<strong>{dateString} </strong>
          {newDate})
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
  created: undefined,
};

Task.propTypes = {
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
  taskDone: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  updated: PropTypes.string,
  created: PropTypes.string,
};

export default Task;
