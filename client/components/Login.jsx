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
var LoginForm_1 = require("./layout/LoginForm");
var ForgotForm_1 = require("./layout/ForgotForm");
var Layout_1 = require("./layout/Layout");
var Spinner_1 = require("./layout/Spinner");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            email: '',
            forgotEmail: '',
            password: '',
            spinner: false,
            forgotSpinner: false
        };
        _this.handleEmailChange = function (event) {
            _this.setState({ email: event.currentTarget.value });
        };
        _this.handleForgotEmailChange = function (event) {
            _this.setState({ forgotEmail: event.currentTarget.value });
        };
        _this.handlePasswordChange = function (event) {
            _this.setState({ password: event.currentTarget.value });
        };
        _this.handleSubmit = function (event) {
            event.preventDefault();
            _this.setState({ spinner: true });
            if (_this.resultMessage !== null) {
                _this.resultMessage.innerHTML = '';
            }
            _this.props.handleLogin({
                email: _this.state.email,
                password: _this.state.password
            });
        };
        _this.handleForgotSubmit = function (event) {
            event.preventDefault();
            _this.props.handleForgot(_this.state.forgotEmail);
            _this.setState({ forgotSpinner: true });
        };
        return _this;
    }
    Login.prototype.componentDidMount = function () {
        this.props.user.error = '';
    };
    Login.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.user.forgotResponse !== undefined) {
            this.setState({ forgotSpinner: false });
        }
        if (nextProps.user.email !== undefined) {
            this.props.history.push('/');
        }
        if (nextProps.error !== '' && nextProps.error !== undefined) {
            this.setState({ spinner: false });
            if (this.resultMessage !== null) {
                this.resultMessage.innerHTML = nextProps.error;
            }
        }
    };
    Login.prototype.render = function () {
        var _this = this;
        return (<Layout_1.default showToGuests>
        <h1 className="page-title">Login Page</h1>
        <LoginForm_1.default myClassName="form__login" handleSubmit={this.handleSubmit} emailValue={this.state.email} passwordValue={this.state.password} handleEmailChange={this.handleEmailChange} handlePasswordChange={this.handlePasswordChange}/>
        <div className="server-response" ref={function (resultMessage) {
            _this.resultMessage = resultMessage;
        }}/>
        {this.state.spinner ? <Spinner_1.default /> : null}
        <h2 className="page-title">Did you forget your password?</h2>
        <ForgotForm_1.default myClassName="form__login" emailValue={this.state.forgotEmail} handleEmailChange={this.handleForgotEmailChange} handleSubmit={this.handleForgotSubmit}/>
        {this.state.forgotSpinner ? <Spinner_1.default /> : null}
      </Layout_1.default>);
    };
    Login.defaultProps = {
        error: ''
    };
    return Login;
}(React.Component));
var mapStateToProps = function (state) { return ({
    user: state.user,
    error: state.user.error
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleLogin: function (user) {
        dispatch(user_1.logIn(user));
    },
    handleForgot: function (email) {
        dispatch(user_1.forgot(email));
    }
}); };
exports.UnwrappedLogin = Login;
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login);
