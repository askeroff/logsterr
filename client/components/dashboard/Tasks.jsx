"use strict";
exports.__esModule = true;
var React = require("react");
var helpers_1 = require("../../helpers");
var Tasks = function (props) {
    return props.tasks.map(function (item) { return (<p className="dashboard__item-task" key={item._id}>
      <span>
        <strong>{item.taskName}: </strong>
        <span>{helpers_1.formatTime(item.seconds)}</span>
      </span>
    </p>); });
};
exports["default"] = Tasks;
