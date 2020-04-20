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
var react_1 = require("react");
var Tasks_1 = require("./Tasks");
var helpers_1 = require("../../helpers");
var Spinner_1 = require("../layout/Spinner");
var RenderData = /** @class */ (function (_super) {
    __extends(RenderData, _super);
    function RenderData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderData.prototype.showData = function (myData) {
        var result = [];
        var recursive = function (data, padding) {
            if (padding === void 0) { padding = 0; }
            data.forEach(function (project) {
                var myPadding = project.parent_id === '' ? 0 : padding;
                var parentClass = project.parent_id === '' ? 'dashboard__parent' : '';
                if (project.seconds) {
                    var element = (<div style={{ paddingLeft: myPadding + "px" }} className={("dashboard__item " + parentClass).trim()} key={project._id}>
              <h3 className="dashboard__item-title">
                {project.name}: <span>{helpers_1.formatTime(project.seconds)}</span>
              </h3>
              <div className="dashboard__item-tasks">
                <Tasks_1.default tasks={project.tasks || []}/>
              </div>
            </div>);
                    result.push(element);
                }
                if (project.children && project.children.length > 0) {
                    recursive(project.children, padding + 10);
                }
            });
        };
        recursive(myData);
        if (result.length === 0) {
            return <p>Nothing yet</p>;
        }
        return result;
    };
    RenderData.prototype.render = function () {
        if (this.props.isFetching) {
            return <Spinner_1.default />;
        }
        return this.showData(this.props.data);
    };
    return RenderData;
}(react_1.Component));
exports["default"] = RenderData;
