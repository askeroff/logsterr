import React from 'react';
import PropTypes from 'prop-types';

const ButtonsGroup = props => (
  <div className="buttons-group">
    {props.showInput ? (
      <button onClick={props.handleRenaming} className="button--info">
        Ok
      </button>
    ) : null}

    {!props.done ? (
      <button
        title="Show timer"
        onClick={props.showTimer}
        className="button--info button--small"
      >
        <span aria-label="timer" role="img">
          ⏱️
        </span>
      </button>
    ) : null}

    {!props.showInput ? (
      <button
        onClick={() => props.handleShowInput(props.name)}
        title="Edit this item"
        className="button--info button--small"
      >
        <span aria-label="edit" role="img">
          ✎
        </span>
      </button>
    ) : null}
    <button
      title={`Mark this item ${props.doneButtonValue}`}
      onClick={() => props.taskDone(props.id)}
      className="button--info button--small"
    >
      <span aria-label="mark done" role="img">
        ✔
      </span>
    </button>

    <button
      onClick={() => props.handleDelete(props.id)}
      className="button--info button--danger button--small"
      title="Delete this item"
    >
      <span aria-label="delete" role="img">
        ✕
      </span>
    </button>
  </div>
);

ButtonsGroup.propTypes = {
  done: PropTypes.bool.isRequired,
  doneButtonValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showInput: PropTypes.bool.isRequired,
  showTimer: PropTypes.func.isRequired,
  handleRenaming: PropTypes.func.isRequired,
  handleShowInput: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  taskDone: PropTypes.func.isRequired,
};

export default ButtonsGroup;
