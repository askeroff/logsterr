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
var react_redux_1 = require("react-redux");
var dashboard_1 = require("../../actions/dashboard");
var timelog_1 = require("../../actions/timelog");
var projects_1 = require("../../actions/projects");
var tasks_1 = require("../../actions/tasks");
var Layout_1 = require("../layout/Layout");
var NotFound_1 = require("../NotFound");
var TasksList_1 = require("../tasks/TasksList");
var ProjectInfo_1 = require("./ProjectInfo");
var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isReady = false;
        _this.loadData = function () {
            if (_this.props.user.loggedIn && !_this.isReady) {
                if (_this.props.projects.list.length === 0) {
                    _this.props.handleGettingProjects();
                }
                _this.props.handleTasks(_this.props.match.params.id);
                _this.isReady = true;
            }
        };
        return _this;
    }
    Project.prototype.componentDidMount = function () {
        var _this = this;
        var projectTasks = this.props.tasks.list.find(function (item) { return item.project._id === _this.props.match.params.id; });
        if (projectTasks && projectTasks.list !== undefined) {
            this.isReady = true;
        }
        this.loadData();
        var id = this.props.match.params.id;
        this.props.handleDashboardData(id, this.props.user.startsDay || 0);
    };
    Project.prototype.componentDidUpdate = function () {
        this.loadData();
    };
    Project.prototype.componentWillUnmount = function () {
        this.props.clearSecondsLog();
        this.isReady = false;
    };
    Project.prototype.render = function () {
        var _this = this;
        var _a = this.props, dashboardData = _a.dashboardData, tasks = _a.tasks;
        var projectTasks = tasks.list.find(function (item) { return item.project._id === _this.props.match.params.id; });
        var showSpinner = (tasks.isFetching || !this.isReady) &&
            (projectTasks && projectTasks.list) === undefined;
        if (projectTasks === undefined && !showSpinner) {
            return <NotFound_1.default />;
        }
        return (<Layout_1.default showSpinner={showSpinner}>
        {projectTasks && projectTasks.list ? (<React.Fragment>
            <ProjectInfo_1.default project={projectTasks.project} handleAddingTimeToProject={this.props.handleAddingTimeToProject} handleNewTask={this.props.handleNewTask} pathname={this.props.location.pathname} dashboardData={dashboardData}/>
            <TasksList_1.default tasks={projectTasks} projectId={this.props.match.params.id}/>{' '}
          </React.Fragment>) : null}
      </Layout_1.default>);
    };
    Project.defaultProps = {
        projects: { list: [] },
        tasks: { list: [] },
        user: {},
        dashboardData: {}
    };
    return Project;
}(React.Component));
var mapStateToProps = function (state) { return ({
    user: state.user,
    tasks: state.tasks,
    dashboardData: state.dashboard,
    projects: state.projects,
    timelog: state.timelog
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleTasks: function (projectId) {
        dispatch(tasks_1.fetchTasks());
        dispatch(tasks_1.getTasks(projectId, false));
    },
    handleNewTask: function (task) {
        dispatch(tasks_1.newTask(task));
    },
    handleGettingProjects: function () {
        dispatch(projects_1.getProjects());
    },
    handleDashboardData: function (id, startsDay) {
        dispatch(dashboard_1.fetchPosts());
        dispatch(dashboard_1.getMotivationData(id, startsDay));
    },
    handleAddingTimeToProject: function (id, time) {
        dispatch(projects_1.addTimeToProject(id, time));
    },
    clearTasksList: function () {
        dispatch(tasks_1.clearTasks());
    },
    clearSecondsLog: function () {
        dispatch(timelog_1.clearLogs());
        /*
          I need to clear up the seconds in the reducer, when component unmounts.
          Otherwise it computes data wrong for the other components;
        */
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Project);
