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
var moment_1 = require("moment");
var react_router_dom_1 = require("react-router-dom");
var timestorage_1 = require("../scripts/timestorage");
var helpers_1 = require("../../helpers");
var ShowLostTime = /** @class */ (function (_super) {
    __extends(ShowLostTime, _super);
    function ShowLostTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            show: 'block'
        };
        _this.close = function () {
            timestorage_1["default"].reset();
            _this.setState({
                show: 'none'
            });
        };
        return _this;
    }
    ShowLostTime.prototype.render = function () {
        var getStorageData = timestorage_1["default"].get();
        if (getStorageData !== null && getStorageData !== undefined) {
            var now = moment_1["default"]();
            var then = new Date(getStorageData.time);
            var diff = helpers_1.formatTime(now.diff(then, 'seconds'));
            return (<div style={{ display: this.state.show }} className="message message--info">
          <span>
            You started tracking time for{' '}
            <react_router_dom_1.Link to={"/projects/" + getStorageData.projectId}>
              this project
            </react_router_dom_1.Link>{' '}
            but did not stop the timer. If you still need this time to be
            tracked, you can add it manually.
          </span>
          <p>
            <strong>Task:</strong> <em>{getStorageData.taskName}</em>
            <strong> — Time passed:</strong> <em>{diff}</em>
          </p>
          <input type="button" className="button--info" value="Dismiss!" onClick={this.close}/>
        </div>);
        }
        return null;
    };
    return ShowLostTime;
}(React.Component));
exports["default"] = ShowLostTime;
