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
var prop_types_1 = require("prop-types");
var sweetalert_1 = require("sweetalert");
var helpers_1 = require("../../helpers/");
var TimeAddForm_1 = require("./TimeAddForm");
var timestorage_1 = require("../scripts/timestorage");
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            seconds: 0,
            date: undefined,
            started: false,
            showForm: false
        };
        _this.timer = null;
        _this.incrementSeconds = function () {
            _this.setState(function (prevState) {
                var now = new Date().getTime();
                return {
                    seconds: parseInt((now - prevState.date) / 1000, 10)
                };
            });
        };
        _this.handleStart = function () {
            var now = new Date().getTime();
            _this.setState({ started: true, date: now }, function () {
                timestorage_1["default"].add(_this.props.id, _this.props.taskName, _this.props.project);
                _this.incrementSeconds(); // fixes one second delay when first called
                _this.timer = setInterval(_this.incrementSeconds, 1000);
            });
        };
        _this.handleStop = function () {
            clearInterval(_this.timer);
            timestorage_1["default"].reset();
            var data = {
                seconds: _this.state.seconds,
                task: _this.props.id,
                done: true,
                project: _this.props.project
            };
            _this.props.handleAddingTimeLog(data, _this.state.seconds);
            _this.setState({ started: false, seconds: 0 });
            sweetalert_1["default"]('Good job!', 'Time has been added to your timelog', 'success');
        };
        _this.handleTimer = function () {
            if (!_this.state.started) {
                _this.handleStart();
            }
            else {
                _this.handleStop();
            }
        };
        _this.formToggle = function () {
            _this.setState(function (state) { return ({
                showForm: !state.showForm
            }); });
        };
        return _this;
    }
    Timer.prototype.render = function () {
        var timerButtonString = this.state.started ? 'stop' : 'start';
        var addTimeStrng = this.state.showForm ? 'Cancel' : 'Add Time';
        var time = helpers_1.formatForTimer(this.state.seconds);
        return (<div className="timer">
        <div className="timer__buttons">
          <button onClick={this.handleTimer} className="timer__buttons-item timer__buttons-item--green">
            {timerButtonString}
          </button>
          <button onClick={this.formToggle} className="timer__buttons-item">
            {addTimeStrng}
          </button>
        </div>
        {this.state.showForm ? (<TimeAddForm_1.default addTaskTime={this.props.handleAddingTimeLog} name={this.props.taskName} task={this.props.id} formToggle={this.formToggle} project={this.props.project}/>) : null}

        {this.state.started ? (<div className="timer__time">
            <span>{time}</span>
          </div>) : null}
      </div>);
    };
    return Timer;
}(React.Component));
Timer.propTypes = {
    taskName: prop_types_1["default"].string.isRequired,
    id: prop_types_1["default"].string.isRequired,
    project: prop_types_1["default"].string.isRequired,
    handleAddingTimeLog: prop_types_1["default"].func.isRequired
};
exports["default"] = Timer;
