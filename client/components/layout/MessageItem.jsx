"use strict";
exports.__esModule = true;
var React = require("react");
var MessageItem = function (props) { return (<div className={"message message--" + props.type}>
    <p>{props.message}</p>
    <input type="button" className="button--info" value="Dismiss!" onClick={props.close}/>
  </div>); };
exports["default"] = MessageItem;
