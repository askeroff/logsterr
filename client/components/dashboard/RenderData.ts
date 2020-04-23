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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
// @flow
var react_1 = require("react");
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
                    var element = style = {},  = (void 0).paddingLeft;
                    myPadding + "px";
                }
            }, className = {}(templateObject_1 || (templateObject_1 = __makeTemplateObject(["dashboard__item ", ""], ["dashboard__item ", ""])), parentClass).trim());
        };
        key = { project: project, : ._id }
            >
                className;
        "dashboard__item-title" >
            { project: project, : .name };
        ({ formatTime: function (project) { }, : .seconds } < /span>
            < /h3>
            < div);
        className = "dashboard__item-tasks" >
            tasks;
        {
            project.tasks || [];
        }
        />
            < /div>
            < /div>;
        ;
        result.push(element);
    };
    RenderData.prototype["if"] = function (project, children) { };
    return RenderData;
}(react_1.Component));
 && project.children.length > 0;
{
    recursive(project.children, padding + 10);
}
;
;
recursive(myData);
if (result.length === 0) {
    return Nothing;
    yet < /p>;;
}
return result;
render();
{
    if (this.props.isFetching) {
        return />;;
    }
    return this.showData(this.props.data);
}
exports["default"] = RenderData;
var templateObject_1;
