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
var react_redux_1 = require("react-redux");
var user_1 = require("../actions/user");
var Layout_1 = require("./layout/Layout");
var ResetForm_1 = require("./layout/ResetForm");
var Spinner_1 = require("./layout/Spinner");
var Reset = /** @class */ (function (_super) {
    __extends(Reset, _super);
    function Reset() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            message: 'Checking your token for validity...',
            resetPassword: '',
            resetMessage: '',
            spinner: false
        };
        _this.handlePasswordChange = function (event) {
            _this.setState({
                resetPassword: event.target.value
            });
        };
        _this.handleSubmit = function (event) {
            event.preventDefault();
            _this.setState({ spinner: true });
            _this.props.handlePostReset(_this.props.match.params.token, _this.state.resetPassword);
        };
        return _this;
    }
    Reset.prototype.componentDidMount = function () {
        this.props.handleGetReset(this.props.match.params.token);
    };
    Reset.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.getReset === true) {
            this.setState({
                message: '',
                spinner: false
            });
        }
        else if (nextProps.getReset === false) {
            this.setState({
                spinner: false,
                message: 'Your token is invalid. It might be expired'
            });
        }
        this.setState({
            resetMessage: nextProps.resetMessage || ''
        });
        if (nextProps.postReset === true) {
            this.props.history.push('/login');
        }
    };
    Reset.prototype.render = function () {
        return (<Layout_1.default showToGuests>
        <h1 className="page-title">Reset Password</h1>
        {this.state.message === '' ? (<ResetForm_1.default myClassName="form__login" passwordValue={this.state.resetPassword} handlePasswordChange={this.handlePasswordChange} handleSubmit={this.handleSubmit}/>) : (this.state.message)}
        <span>{this.state.resetMessage}</span>
        {this.state.spinner ? <Spinner_1.default /> : null}
      </Layout_1.default>);
    };
    return Reset;
}(React.Component));
Reset.defaultProps = {
    getReset: false,
    resetMessage: '',
    postReset: false
};
Reset.propTypes = {
    handleGetReset: prop_types_1["default"].func.isRequired,
    handlePostReset: prop_types_1["default"].func.isRequired,
    match: prop_types_1["default"].object.isRequired,
    history: prop_types_1["default"].object.isRequired,
    getReset: prop_types_1["default"].bool,
    resetMessage: prop_types_1["default"].string,
    postReset: prop_types_1["default"].bool
};
var mapStateToProps = function (state) { return ({
    getReset: state.user.getReset,
    resetMessage: state.user.resetMessage,
    postReset: state.user.postReset
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleGetReset: function (token) {
        dispatch(user_1.getReset(token));
    },
    handlePostReset: function (token, password) {
        dispatch(user_1.postReset(token, password));
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Reset);
