// @flow
import React from 'react';

type Props = {
  done: boolean,
  doneButtonValue: string,
  id: string,
  projectId: string,
  name: string,
  showInput: boolean,
  showTimer: () => void,
  handleRenaming: () => void,
  handleShowInput: (name: string) => void,
  handleDelete: (id: string) => void,
  taskDone: (id: string, projectId: string) => void
};

const ButtonsGroup = (props: Props) => (
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
      onClick={() => props.taskDone(props.id, props.projectId)}
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
export default ButtonsGroup;
