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
var Layout_1 = require("./layout/Layout");
var Index_1 = require("./dashboard/Index");
var Spinner_1 = require("./layout/Spinner");
var LandingPage_1 = require("./LandingPage");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shouldRender = function () {
            var hasHistory = Object.prototype.hasOwnProperty.call(_this.props.history, 'push');
            if (_this.props.user.loggedIn) {
                return (<Layout_1.default showToGuests>
          <Index_1.default />
        </Layout_1.default>);
            }
            else if (_this.props.user.loggedIn === false && hasHistory) {
                return (<Layout_1.default showToGuests contentClass="landing-wrapper">
          <LandingPage_1.default />
        </Layout_1.default>);
            }
            return (<Layout_1.default showToGuests>
        <Spinner_1.default />
      </Layout_1.default>);
        };
        return _this;
    }
    Home.prototype.render = function () {
        return this.shouldRender();
    };
    Home.defaultProps = { history: {}, user: {} };
    return Home;
}(React.Component));
var mapStateToProps = function (state) { return ({
    user: state.user
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(Home);
