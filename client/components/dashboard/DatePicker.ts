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
// @flow
var react_1 = require("react");
var moment_1 = require("moment");
require("react-dates/initialize");
require("react-dates/lib/css/_datepicker.css");
var react_dates_1 = require("react-dates");
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDatesChange = function (_a) {
            var startDate = _a.startDate, endDate = _a.endDate;
            _this.props.loadData(startDate, endDate);
            _this.props.setDates(startDate, endDate);
        };
        _this.changeData = function (event) {
            _this.props.setDefaultShow(event.target.value);
            switch (event.target.value) {
                case 'lastweek': {
                    var lastSunday = moment_1["default"]().isoWeekday(0)._d;
                    var lastMonday = moment_1["default"]().isoWeekday(-6)._d;
                    _this.onDatesChange({
                        startDate: moment_1["default"](lastMonday),
                        endDate: moment_1["default"](lastSunday)
                    });
                    break;
                }
                case 'today': {
                    var today = moment_1["default"](new Date());
                    _this.onDatesChange({ startDate: today, endDate: today });
                    break;
                }
                case 'month': {
                    _this.onDatesChange({
                        startDate: moment_1["default"]().startOf('month'),
                        endDate: moment_1["default"]().endOf('month')
                    });
                    break;
                }
                case 'thisweek': {
                    var thisMonday = moment_1["default"]().isoWeekday(1)._d;
                    var thisSunday = moment_1["default"]().isoWeekday(7)._d;
                    _this.onDatesChange({
                        startDate: moment_1["default"](thisMonday),
                        endDate: moment_1["default"](thisSunday)
                    });
                    break;
                }
                default:
                    return null;
            }
            return 0;
        };
        _this.focusedInput = { "this": .props.focusedInput };
        _this.onFocusChange = { focusedInput: focusedInput,
            "this": .props.setFocusedInput(focusedInput)
        }
            /  >
            /React.Fragment>;
        return _this;
    }
    DatePicker.prototype.render = function () {
        return className = "dashboard__select";
        onChange = { "this": .changeData };
        value = { "this": .props.defaultShow }
            >
                value;
        "lastweek" > Last;
        Week < /option>
            < option;
        value = "thisweek" > This;
        Week < /option>
            < option;
        value = "today" > Today < /option>
            < option;
        value = "month" > This;
        Month < /option>
            < /select>
            < react_dates_1.DateRangePicker;
        startDate = { "this": .props.startDate };
        displayFormat = "DD/MM/YYYY";
        startDateId = "your_unique_start_date_id";
        endDate = { "this": .props.endDate };
        endDateId = "your_unique_end_date_id";
        onDatesChange = { "this": .onDatesChange };
        firstDayOfWeek = { 1:  };
        minimumNights = { 0:  };
        isOutsideRange = {}();
        false;
    };
    ;
    return DatePicker;
}(react_1.Component));
exports["default"] = DatePicker;
