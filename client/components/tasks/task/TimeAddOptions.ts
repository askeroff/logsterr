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
var TimeAddOptions = /** @class */ (function (_super) {
    __extends(TimeAddOptions, _super);
    function TimeAddOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            moveTime: true,
            deleteTime: false
        };
        _this.changeMoveTime = function (e) {
            _this.setState({
                moveTime: e.currentTarget.checked
            });
        };
        _this.changeDeleteTime = function (e) {
            _this.setState({
                deleteTime: e.currentTarget.checked
            });
        };
        return _this;
    }
    TimeAddOptions.prototype.render = function () {
        return className = "timeoptions" >
            Add;
        this;
        task(templateObject_1 || (templateObject_1 = __makeTemplateObject(["s time to the new project\n          <input\n            type=\"checkbox\"\n            ref={this.props.setMoveRef}\n            checked={this.state.moveTime}\n            value={this.state.moveTime}\n            onChange={this.changeMoveTime}\n          />\n        </label>\n        <label>\n          Subtract this task"], ["s time to the new project\n          <input\n            type=\"checkbox\"\n            ref={this.props.setMoveRef}\n            checked={this.state.moveTime}\n            value={this.state.moveTime}\n            onChange={this.changeMoveTime}\n          />\n        </label>\n        <label>\n          Subtract this task"])));
        s;
        time;
        from;
        this;
        project
            < input;
        type = "checkbox";
        ref = { "this": .props.setDeleteRef };
        checked = { "this": .state.deleteTime };
        value = { "this": .state.deleteTime };
        onChange = { "this": .changeDeleteTime }
            /  >
            /label>
            < /div>;
        ;
    };
    return TimeAddOptions;
}(react_1["default"].Component));
exports["default"] = TimeAddOptions;
var templateObject_1;
