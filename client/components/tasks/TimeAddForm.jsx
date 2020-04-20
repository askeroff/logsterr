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
var sweetalert_1 = require("sweetalert");
var TimeAddForm = /** @class */ (function (_super) {
    __extends(TimeAddForm, _super);
    function TimeAddForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            minutes: '00',
            hours: '00'
        };
        _this.handleMinutesChange = function (e) {
            _this.setState({
                minutes: e.currentTarget.value
            });
        };
        _this.handleHoursChange = function (e) {
            _this.setState({
                hours: e.currentTarget.value
            });
        };
        _this.handleSubmit = function () {
            var _a = _this.state, hours = _a.hours, minutes = _a.minutes;
            var _b = _this.props, task = _b.task, project = _b.project, addTaskTime = _b.addTaskTime, addProjectTime = _b.addProjectTime, formToggle = _b.formToggle;
            if (!_this.isNumber(+hours) || !_this.isNumber(+minutes)) {
                sweetalert_1["default"]('Invalid', 'Provide only numbers', 'error');
                return null;
            }
            var hoursToSeconds = Number(hours) * 3600;
            var minutesToSeconds = Number(minutes) * 60;
            var result = hoursToSeconds + minutesToSeconds;
            if (result < 60) {
                sweetalert_1["default"]('Invalid', 'Added time should be greater than one minute', 'error');
                return null;
            }
            if (typeof addProjectTime === 'function') {
                addProjectTime(project, result);
            }
            else if (typeof addTaskTime === 'function') {
                var data = {
                    seconds: result,
                    done: true,
                    task: task,
                    project: project
                };
                addTaskTime(data, result);
            }
            formToggle();
            sweetalert_1["default"]('Wohoo!', 'Time has been added!', 'success');
            return result;
        };
        return _this;
    }
    TimeAddForm.prototype.isNumber = function (n) {
        return !isNaN(n);
    };
    TimeAddForm.prototype.render = function () {
        var addClass = this.props.from === 'project' ? 'timer__addTimeForm-project' : '';
        return (<div className={"timer__addTimeForm " + addClass}>
        <label htmlFor="hours">HH</label>
        <input onChange={this.handleHoursChange} name="hours" type="text" className="timer__addTimeForm-input" value={this.state.hours}/>
        <label htmlFor="minutes">MM</label>
        <input onChange={this.handleMinutesChange} name="minutes" type="text" className="timer__addTimeForm-input" value={this.state.minutes}/>
        <input type="button" onClick={this.handleSubmit} className="timer__addTimeForm-submit" value="Ok"/>
      </div>);
    };
    TimeAddForm.defaultProps = {
        name: 'Not defined',
        from: 'task',
        task: ''
    };
    return TimeAddForm;
}(React.Component));
exports["default"] = TimeAddForm;
