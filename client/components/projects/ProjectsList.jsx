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
var projects_1 = require("../../actions/projects");
var ProjectItem_1 = require("./ProjectItem");
var ProjectsList = /** @class */ (function (_super) {
    __extends(ProjectsList, _super);
    function ProjectsList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { spinner: true };
        _this.onDelete = function (id) {
            sweetalert_1["default"]({
                title: 'Are you sure?',
                text: 'Once deleted, you will not be able to recover this project',
                icon: 'warning',
                buttons: true,
                dangerMode: true
            }).then(function (willDelete) {
                if (willDelete) {
                    _this.props.handleDeleting(id);
                }
                else {
                    sweetalert_1["default"]('Your project is safe!');
                }
            });
        };
        _this.projects = [];
        _this.printProjects = function (parentID, padding) {
            if (parentID === void 0) { parentID = ''; }
            if (padding === void 0) { padding = 0; }
            // padding issues
            _this.props.projects.forEach(function (project) {
                if (project.parent_id === parentID) {
                    if (project.done === _this.props.showArchived) {
                        var getPadding = _this.props.showArchived ? 0 : padding;
                        _this.projects.push(<ProjectItem_1.default onDelete={_this.onDelete} padding={getPadding} toggleDone={_this.props.handleToggling} projectsList={_this.props.projects} key={project._id} project={project} renameMe={_this.props.handleRenaming}/>);
                    }
                    _this.printProjects(project._id, padding + 16);
                }
            });
            return _this.projects;
        };
        return _this;
    }
    ProjectsList.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps) {
            this.setState({ spinner: false });
        }
    };
    ProjectsList.prototype.render = function () {
        this.projects = [];
        return this.printProjects();
    };
    ProjectsList.defaultProps = {
        projects: []
    };
    return ProjectsList;
}(React.Component));
var mapStateToProps = function (state) { return ({
    projectsList: state.projects
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleDeleting: function (projectId) {
        dispatch(projects_1.deleteProject(projectId));
    },
    handleRenaming: function (id, name, parentID) {
        dispatch(projects_1.renameProject(id, name, parentID));
    },
    handleToggling: function (id) {
        dispatch(projects_1.toggleDone(id));
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
