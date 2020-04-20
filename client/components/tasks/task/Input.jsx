"use strict";
exports.__esModule = true;
var React = require("react");
var ProjectsSelect_1 = require("../../projects/ProjectsSelect");
;
var Input = function (props) { return (<div className="tasks__list-input">
    <input type="text" onKeyPress={function (e) {
    if (e.charCode === 13) {
        props.handleEnterButton(props.id, props.editName, props.categoryID);
    }
}} value={props.editName} onChange={props.handleNameInput}/>
    <ProjectsSelect_1.default disableDefault parentID={props.categoryID} projects={props.projects} changeSelect={props.changeSelect}/>
  </div>); };
exports["default"] = Input;
