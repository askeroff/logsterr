"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var helpers_1 = require("../../helpers");
var ProjectsSelect_1 = require("./ProjectsSelect");
var ProjectItem = /** @class */ (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showInput: false,
            newName: '',
            parentID: _this.props.project.parent_id
        };
        _this.handleNewName = function (e) {
            _this.setState({ newName: e.currentTarget.value });
        };
        _this.handleShowInput = function (name) {
            _this.setState({
                showInput: !_this.state.showInput,
                newName: name
            });
        };
        _this.handleRenaming = function (id, name, parentID) {
            _this.props.renameMe(id, name, parentID);
            _this.setState({
                showInput: false
            });
        };
        _this.handleEnterButton = function (event) {
            if (event.charCode === 13) {
                _this.renameLink.click();
            }
        };
        _this.changeSelect = function (e) {
            _this.setState({
                parentID: e.currentTarget.value
            });
        };
        _this.shouldShowInput = function () {
            if (_this.state.showInput) {
                return (<div className="project-name">
          <input type="text" value={_this.state.newName} className="name-input" onKeyPress={_this.handleEnterButton} onChange={_this.handleNewName}/>
          <ProjectsSelect_1.default disableItself itselfID={_this.props.project._id} parentID={_this.state.parentID} projects={_this.props.projectsList} changeSelect={_this.changeSelect} defaultOption="No Parent"/>
        </div>);
            }
            return null;
        };
        return _this;
    }
    ProjectItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, project = _a.project, onDelete = _a.onDelete;
        var _b = this.state, showInput = _b.showInput, parentID = _b.parentID;
        var hideTaskName = showInput ? 'none' : '';
        var hideButtons = showInput ? 'hide' : '';
        var editClassName = showInput ? 'projects__item--edit' : '';
        var parentClassName = parentID === '' ? 'project__item--parent' : '';
        return (<li style={{ marginLeft: this.props.padding + "px" }} className={("projects__item " + editClassName + " " + parentClassName).trim()}>
        <react_router_dom_1.Link className="projects__item-title" style={{ display: "" + hideTaskName }} to={"/projects/" + project._id}>
          <span>{project.name}</span>
          <span className="pretty-time">{helpers_1.formatTime(project.timeSpent)}</span>
        </react_router_dom_1.Link>
        {this.shouldShowInput()}
        <div className="buttons-group">
          {showInput ? (<button onClick={function () {
            return _this.handleRenaming(project._id, _this.state.newName, _this.state.parentID);
        }} ref={function (link) {
            _this.renameLink = link;
        }} className="button--info">
              Ok
            </button>) : null}
          <button onClick={function () { return _this.handleShowInput(project.name); }} className={"button--info button--small " + hideButtons}>
            <span aria-label="edit" role="img">
              ✎
            </span>
          </button>

          <button title={'Mark this project done'} onClick={function () { return _this.props.toggleDone(project._id); }} className={"button--info button--small " + hideButtons}>
            <span aria-label="mark done" role="img">
              ✔
            </span>
          </button>

          <button onClick={function () { return onDelete(project._id); }} className={"button--info button-danger button--small " + hideButtons}>
            <span aria-label="delete" role="img">
              ✕
            </span>
          </button>
        </div>
      </li>);
    };
    return ProjectItem;
}(React.Component));
exports["default"] = ProjectItem;
