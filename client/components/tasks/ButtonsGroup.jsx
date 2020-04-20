"use strict";
exports.__esModule = true;
var React = require("react");
var ButtonsGroup = function (props) {
    var groupClassName = props.showInput
        ? 'buttons-group buttons-group--show'
        : 'buttons-group';
    return (<div className={groupClassName}>
      {props.showInput ? (<button onClick={props.handleRenaming} className="button--info">
          Ok
        </button>) : null}

      {!props.done ? (<button title="Show timer" onClick={props.showTimer} className="button--info button--small">
          <span aria-label="timer" role="img">
            ⏱️
          </span>
        </button>) : null}

      {!props.showInput ? (<button onClick={function () { return props.handleShowInput(props.name); }} title="Edit this item" className="button--info button--small">
          <span aria-label="edit" role="img">
            ✎
          </span>
        </button>) : null}
      <button title={"Mark this item " + props.doneButtonValue} onClick={function () { return props.taskDone(props.id, props.projectId); }} className="button--info button--small">
        <span aria-label="mark done" role="img">
          ✔
        </span>
      </button>

      <button onClick={function () { return props.handleDelete(props.id); }} className="button--info button--danger button--small" title="Delete this item">
        <span aria-label="delete" role="img">
          ✕
        </span>
      </button>
    </div>);
};
exports["default"] = ButtonsGroup;
