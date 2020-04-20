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
        return (<div className="timeoptions">
        <label>
          Add this task`s time to the new project
          <input type="checkbox" ref={this.props.setMoveRef} checked={this.state.moveTime} value={this.state.moveTime} onChange={this.changeMoveTime}/>
        </label>
        <label>
          Subtract this task`s time from this project
          <input type="checkbox" ref={this.props.setDeleteRef} checked={this.state.deleteTime} value={this.state.deleteTime} onChange={this.changeDeleteTime}/>
        </label>
      </div>);
    };
    return TimeAddOptions;
}(React.Component));
exports["default"] = TimeAddOptions;
