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
var sweetalert_1 = require("sweetalert");
var tasks_1 = require("../../actions/tasks");
var timelog_1 = require("../../actions/timelog");
var Task_1 = require("./task/Task");
var TasksList = /** @class */ (function (_super) {
    __extends(TasksList, _super);
    function TasksList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getTaskProps = function (task) { return ({
            id: task._id,
            name: task.name,
            done: task.done,
            projects: _this.props.projects,
            handleDelete: _this.handleTaskDelete,
            handleRename: _this.props.handleEditing,
            handleAddingTimeLog: _this.props.handleAddingTimeLog,
            projectId: _this.props.projectId,
            taskDone: _this.props.handleDone,
            timeSpent: task.timeSpent
        }); };
        _this.handleTaskDelete = function (id) {
            sweetalert_1["default"]({
                title: 'Are you sure?',
                text: 'Once deleted, you will not be able to recover this task',
                icon: 'warning',
                buttons: true,
                dangerMode: true
            }).then(function (willDelete) {
                if (willDelete) {
                    _this.props.handleDeleting(id, _this.props.projectId);
                }
            });
        };
        return _this;
    }
    TasksList.prototype.mapItems = function (items) {
        var _this = this;
        if (items === void 0) { items = []; }
        if (items.length === 0) {
            return <li>No tasks yet</li>;
        }
        return items.map(function (task) { return (<Task_1.default key={task._id} {..._this.getTaskProps(task)}/>); });
    };
    TasksList.prototype.render = function () {
        var _a = this.props, tasks = _a.tasks, showDone = _a.showDone;
        var data = showDone ? tasks.doneList : tasks.list;
        return <ul className="tasks__list">{this.mapItems(data)}</ul>;
    };
    TasksList.defaultProps = {
        tasks: [],
        showDone: false
    };
    return TasksList;
}(React.Component));
var mapStateToProps = function (state) { return ({
    projects: state.projects
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleDeleting: function (id, projectId) {
        dispatch(tasks_1.deleteTask(id, projectId));
    },
    handleEditing: function (params) {
        dispatch(tasks_1.renameTask(params));
    },
    handleDone: function (id, projectId) {
        dispatch(tasks_1.toggleDone(id, projectId));
    },
    handleAddingTimeLog: function (data, seconds) {
        dispatch(timelog_1.addTimelog(data, seconds));
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TasksList);
