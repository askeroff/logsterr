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
var react_redux_1 = require("react-redux");
var projects_1 = require("../../actions/projects");
var tasks_1 = require("../../actions/tasks");
var Layout_1 = require("../layout/Layout");
var NotFound_1 = require("../NotFound");
var TasksList_1 = require("../tasks/TasksList");
var Archive = /** @class */ (function (_super) {
    __extends(Archive, _super);
    function Archive() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isReady = false;
        _this.loadData = function () {
            if (_this.props.user.loggedIn && !_this.isReady) {
                if (_this.props.projects.list.length === 0) {
                    _this.props.handleProjects();
                }
                _this.props.handleTasks(_this.props.match.params.id);
                _this.isReady = true;
            }
        };
        return _this;
    }
    Archive.prototype.componentDidMount = function () {
        var _this = this;
        var projectTasks = this.props.tasks.list.find(function (item) { return item.project._id === _this.props.match.params.id; });
        if (projectTasks && projectTasks.doneList !== undefined) {
            this.isReady = true;
        }
        this.loadData();
    };
    Archive.prototype.componentDidUpdate = function () {
        this.loadData();
    };
    Archive.prototype.componentWillUnmount = function () {
        this.isReady = false;
    };
    Archive.prototype.render = function () {
        var _this = this;
        var _a = this.props, tasks = _a.tasks, match = _a.match;
        var projectTasks = tasks.list.find(function (item) { return item.project._id === _this.props.match.params.id; });
        var showSpinner = (tasks.isFetching || !this.isReady) &&
            (projectTasks && projectTasks.doneList) === undefined;
        if (projectTasks === undefined && !showSpinner) {
            return <NotFound_1.default />;
        }
        return (<Layout_1.default showSpinner={showSpinner}>
        {projectTasks && projectTasks.doneList ? (<React.Fragment>
            <h1 className="page-title">{projectTasks.project.name}</h1>
            <div className="project--desc">
              <p>Archive of your finished tasks! </p>
              <react_router_dom_1.Link to={"/projects/" + match.params.id}>
                Go back to the project
              </react_router_dom_1.Link>
              .
            </div>

            <TasksList_1.default tasks={projectTasks} showDone projectId={this.props.match.params.id}/>
          </React.Fragment>) : null}
      </Layout_1.default>);
    };
    Archive.defaultProps = {
        projects: { list: [] },
        tasks: { list: [] },
        user: {}
    };
    return Archive;
}(React.Component));
var mapStateToProps = function (state) { return ({
    projects: state.projects,
    user: state.user,
    tasks: state.tasks
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleProjects: function () {
        dispatch(projects_1.getProjects());
    },
    handleTasks: function (projectId) {
        dispatch(tasks_1.fetchTasks());
        dispatch(tasks_1.getTasks(projectId, true));
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Archive);
