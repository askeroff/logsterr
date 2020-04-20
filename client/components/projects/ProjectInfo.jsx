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
var TimeAddForm_1 = require("../tasks/TimeAddForm");
var AddForm_1 = require("./AddForm");
var MotivationBlock_1 = require("./MotivationBlock");
var helpers_1 = require("../../helpers");
var ProjectInfo = /** @class */ (function (_super) {
    __extends(ProjectInfo, _super);
    function ProjectInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showForm: false,
            timeForm: false,
            newTaskInput: ''
        };
        _this.showAddForm = function () {
            _this.setState(function (state) { return ({
                showForm: !state.showForm
            }); });
        };
        _this.showAddTimeForm = function () {
            _this.setState(function (state) { return ({
                timeForm: !state.timeForm
            }); });
        };
        _this.handleNewTaskInput = function (e) {
            _this.setState({
                newTaskInput: e.currentTarget.value
            });
        };
        _this.displayTimeForm = function () {
            if (_this.state.timeForm) {
                return (<TimeAddForm_1.default addProjectTime={_this.props.handleAddingTimeToProject} from="project" formToggle={_this.showAddTimeForm} project={_this.props.project._id}/>);
            }
            return null;
        };
        _this.addTask = function (task) {
            _this.props.handleNewTask({ name: task.name, project: task.project });
            _this.setState({
                showForm: false,
                newTaskInput: ''
            });
        };
        _this.displayAddForm = function () {
            if (_this.state.showForm) {
                return (<AddForm_1.default inputValue={_this.state.newTaskInput} className="form form__newtask" handleInput={_this.handleNewTaskInput} clickHandler={function (e) {
                    e.preventDefault();
                    _this.addTask({
                        name: _this.state.newTaskInput,
                        project: _this.props.project._id
                    });
                }} labelName="Name"/>);
            }
            return null;
        };
        return _this;
    }
    ProjectInfo.prototype.render = function () {
        var addLinkText = this.state.showForm ? 'Hide The Form' : 'New Task';
        return (<div className="project__description">
        <div className="project__info">
          <h1 className="page-title">{this.props.project.name}</h1>
          <h3 className="page-title">
            <span className="pretty-time">
              Total: {helpers_1.formatTime(this.props.project.timeSpent)}
            </span>
          </h3>
          <div className="project__buttons">
            <button onClick={this.showAddForm} className="button--submit">
              {addLinkText}
            </button>
            <button onClick={this.showAddTimeForm} className="button--submit" title="Add Time To The Project">
              Add Time
            </button>
          </div>
          {this.displayTimeForm()}
          {this.displayAddForm()}
        </div>
        <div className="project__motivation">
          <div className="motivation-paragraph">
            <p>
              You can checkout tasks you already done{' '}
              <react_router_dom_1.Link to={this.props.pathname + "/archive"}>here</react_router_dom_1.Link>.
            </p>
            <MotivationBlock_1.default dashboardData={this.props.dashboardData}/>
          </div>
        </div>
      </div>);
    };
    return ProjectInfo;
}(React.Component));
exports["default"] = ProjectInfo;
