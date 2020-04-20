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
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var user_1 = require("../../actions/user");
var Header_1 = require("./Header");
var Footer_1 = require("./Footer");
var Spinner_1 = require("./Spinner");
var ShowLostTime_1 = require("./ShowLostTime");
var ShowMessages_1 = require("./ShowMessages");
var NotLoggedIn_1 = require("../NotLoggedIn");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getContent = function () {
            if (_this.props.showSpinner && _this.props.user && _this.props.user.loggedIn) {
                return <Spinner_1.default />;
            }
            if ((_this.props.user && _this.props.user.loggedIn) ||
                _this.props.showToGuests) {
                return _this.props.children;
            }
            return <NotLoggedIn_1.default />;
        };
        return _this;
    }
    Layout.prototype.componentDidMount = function () {
        if (this.props.user.loggedIn === undefined) {
            this.props.getUserData();
        }
    };
    Layout.prototype.render = function () {
        if (!Object.prototype.hasOwnProperty.call(this.props.user, 'loggedIn')) {
            return <Spinner_1.default />;
        }
        var contentClass = this.props.contentClass
            ? this.props.contentClass
            : 'content-wrapper';
        return (<div className="wrapper">
        <Header_1.default userEmail={this.props.user.email}/>
        <div className={contentClass}>
          <div className="important-messages">
            <ShowLostTime_1.default />
            <ShowMessages_1.default />
          </div>
          {this.getContent()}
        </div>
        <react_toastify_1.ToastContainer />
        <Footer_1.default />
      </div>);
    };
    return Layout;
}(React.Component));
var mapStateToProps = function (state) { return ({
    user: state.user
}); };
var mapDispatchToProps = function (dispatch) { return ({
    getUserData: function () {
        dispatch(user_1.isLoggedIn());
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Layout);
