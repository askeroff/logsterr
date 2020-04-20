"use strict";
/* eslint react/no-array-index-key: off */
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
var react_redux_1 = require("react-redux");
var user_1 = require("../actions/user");
var Layout_1 = require("./layout/Layout");
var SignupForm_1 = require("./layout/SignupForm");
var Spinner_1 = require("./layout/Spinner");
var Signup = /** @class */ (function (_super) {
    __extends(Signup, _super);
    function Signup(props) {
        var _this = _super.call(this, props) || this;
        _this.handleEmailChange = function (event) {
            _this.setState({ email: event.target.value });
        };
        _this.handlePasswordChange = function (event) {
            _this.setState({ password: event.target.value });
        };
        _this.handleInviteValue = function (event) {
            _this.setState({ invite: event.target.value });
        };
        _this.handleSubmit = function (event) {
            event.preventDefault();
            _this.setState({
                spinner: true,
                errors: []
            });
            _this.props.handleSignup({
                email: _this.state.email,
                password: _this.state.password,
                invite: _this.state.invite
            });
        };
        _this.renderErrors = function () {
            return _this.state.errors.map(function (message, index) { return (<div key={index} className="server-response error">
        {message}
      </div>); });
        };
        _this.state = {
            email: '',
            password: '',
            invite: '',
            errors: [],
            spinner: false
        };
        return _this;
    }
    Signup.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.user.email !== undefined) {
            this.props.history.push('/');
        }
        if (nextProps.user.errors && nextProps.user.errors.length > 0) {
            this.setState({ spinner: false, errors: nextProps.user.errors });
        }
    };
    Signup.prototype.render = function () {
        return (<Layout_1.default showToGuests>
        <h1 className="page-title">Signup Page</h1>
        <SignupForm_1.default myClassName="form__signup" handleSubmit={this.handleSubmit} emailValue={this.state.email} inviteValue={this.state.invite} handleInviteChange={this.handleInviteValue} passwordValue={this.state.password} handleEmailChange={this.handleEmailChange} handlePasswordChange={this.handlePasswordChange}/>
        <div>{this.renderErrors()}</div>
        {this.state.spinner ? <Spinner_1.default /> : null}
      </Layout_1.default>);
    };
    return Signup;
}(React.Component));
Signup.propTypes = {
    handleSignup: prop_types_1["default"].func.isRequired,
    history: prop_types_1["default"].object.isRequired,
    user: prop_types_1["default"].object.isRequired
};
var mapStateToProps = function (state) { return ({
    user: state.user
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleSignup: function (user) {
        dispatch(user_1.signUp(user));
    }
}); };
exports.UnwrappedSignup = Signup;
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Signup);
