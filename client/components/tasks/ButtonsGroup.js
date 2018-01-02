import React from 'react';
import PropTypes from 'prop-types';

const ButtonsGroup = props => (
  <div className="buttons-group">
    {props.showInput ? (
      <button onClick={props.handleRenaming} className="info-button">
        Ok
      </button>
    ) : null}

    {!props.done ? (
      <button onClick={props.showTimer} className="info-button">
        Timer
      </button>
    ) : null}

    {!props.showInput ? (
      <button
        onClick={() => props.handleShowInput(props.name)}
        className="info-button"
      >
        Edit
      </button>
    ) : null}
    <button onClick={() => props.taskDone(props.id)} className="info-button">
      {props.doneButtonValue}
    </button>

    <button
      onClick={() => props.handleDelete(props.id)}
      className="info-button danger-button"
    >
      Delete
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
