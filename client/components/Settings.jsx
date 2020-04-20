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
var user_1 = require("../actions/user");
var Layout_1 = require("./layout/Layout");
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hour: +_this.props.user.startsDay || 0,
            oldPassword: '',
            newPassword: ''
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.props.handleSubmit({
                startsDay: _this.state.hour,
                oldPassword: _this.state.oldPassword,
                newPassword: _this.state.newPassword
            });
        };
        _this.handleSelectChange = function (e) {
            _this.setState({ hour: +e.target.value });
        };
        _this.handleChange = function (e) {
            var _a;
            _this.setState((_a = {},
                _a[e.target.name] = e.target.value,
                _a));
        };
        _this.selectView = function () {
            var options = [];
            for (var i = 0; i <= 23; i += 1) {
                var val = i < 10 ? "0" + i : i;
                options.push(<option value={i} key={i}>{val + ":00"}</option>);
            }
            return (<select className="settings--select" value={_this.state.hour} onChange={_this.handleSelectChange}>
        {options}
      </select>);
        };
        return _this;
    }
    Settings.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.user.startsDay !== this.props.user.startsDay) {
            this.setState({ hour: this.props.user.startsDay });
        }
    };
    Settings.prototype.render = function () {
        var labelStyle = { textAlign: 'left' };
        return (<Layout_1.default>
        <form className="settings" onSubmit={this.handleSubmit}>
          <fieldset className="settings--field">
            <legend className="settings--legend">Start of the day</legend>
            {this.selectView()}
          </fieldset>
          <fieldset className="settings--field">
            <legend className="settings--legend">Change Password</legend>
            <label style={labelStyle} htmlFor="oldPassword">
              Old Password
            </label>
            <input name="oldPassword" type="password" className="settings-input" onChange={this.handleChange} value={this.state.oldPassword}/>

            <label style={labelStyle} htmlFor="newPassword">
              New Password
            </label>
            <input name="newPassword" type="password" className="settings-input" onChange={this.handleChange} value={this.state.newPassword}/>
          </fieldset>

          <label style={labelStyle} htmlFor="submit">
            <button className="button--submit settings-submit" type="submit">
              Save
            </button>
          </label>
        </form>
      </Layout_1.default>);
    };
    return Settings;
}(React.Component));
var mapStateToProps = function (state) { return ({
    user: state.user
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleSubmit: function (settings) {
        dispatch(user_1.saveSettings(settings));
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Settings);
