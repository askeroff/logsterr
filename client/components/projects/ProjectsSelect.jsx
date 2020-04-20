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
var ProjectsSelect = /** @class */ (function (_super) {
    __extends(ProjectsSelect, _super);
    function ProjectsSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getListOfProjects = function (parentID, level) {
            if (parentID === void 0) { parentID = ''; }
            if (level === void 0) { level = 1; }
            var children = _this.getAllChildren(_this.props.itselfID);
            _this.props.projects.forEach(function (project) {
                var disabled = false;
                var isChild = children.indexOf(project._id) !== -1;
                var disableItself = (_this.props.disableItself && _this.props.itselfID === project._id);
                if (isChild || disableItself) {
                    disabled = true;
                }
                if (parentID === project.parent_id && !project.done) {
                    _this.projects.push(<option key={"select_project-" + project._id} value={project._id} disabled={disabled} dangerouslySetInnerHTML={{
                        __html: '&nbsp'.repeat(level) + project.name
                    }}/>);
                    _this.getListOfProjects(project._id, level + 3);
                }
            });
            return _this.projects;
        };
        _this.getAllChildren = function (myID) {
            if (myID === undefined) {
                return [];
            }
            var children = [];
            var recursive = function (id) {
                _this.props.projects.forEach(function (project) {
                    if (id === project.parent_id) {
                        children.push(project._id);
                        recursive(project._id);
                    }
                });
            };
            recursive(myID);
            return children;
        };
        _this.projects = [];
        return _this;
    }
    ProjectsSelect.prototype.render = function () {
        this.projects = [];
        var disabled = this.props.disableDefault;
        var listItems = this.getListOfProjects();
        return (<select name="parent_id" onChange={this.props.changeSelect} value={this.props.parentID} className={this.props.myClass}>
        <option disabled={disabled} value={''}>
          {this.props.defaultOption || 'None'}
        </option>
        {listItems}
      </select>);
    };
    ProjectsSelect.defaultProps = {
        parentID: '',
        disableDefault: false,
        myClass: 'project-select'
    };
    return ProjectsSelect;
}(React.Component));
exports["default"] = ProjectsSelect;
