"use strict";
exports.__esModule = true;
var React = require("react");
var FormInput_1 = require("../layout/FormInput");
var ProjectsSelect_1 = require("./ProjectsSelect");
var AddForm = function (props) { return (<form onSubmit={props.clickHandler} className={props.className}>
    <label className="form__title" htmlFor="project-name">
      {props.labelName}
    </label>
    {props.projects.length > 0 ? (<ProjectsSelect_1.default parentID={props.parentID} myClass={''} defaultOption="No Parent" changeSelect={props.changeSelect} projects={props.projects}/>) : null}

    <FormInput_1.default inputValue={props.inputValue} handleInput={props.handleInput} inputName="name"/>
    <input type="submit" value="Add" className="button--submit"/>
  </form>); };
AddForm.defaultProps = {
    clickHandler: function () { },
    changeSelect: function () { },
    parentID: '',
    projects: [],
    className: 'form'
};
exports["default"] = AddForm;
