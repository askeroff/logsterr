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
var ListItem_1 = require("./ListItem");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guestLinks = function () {
            if (!_this.props.userEmail) {
                return (<ul className="nav">
          <ListItem_1.default myClassName="nav__item" url="/" linkText="Home"/>
          <ListItem_1.default myClassName="nav__item" url="/signup" linkText="Sign Up"/>
          <ListItem_1.default myClassName="nav__item" url="/login" linkText="Login"/>
        </ul>);
            }
            return (<ul className="nav">
        <ListItem_1.default myClassName="nav__item" url="/" linkText="Dashboard"/>
        <ListItem_1.default myClassName="nav__item" url="/projects" linkText="Projects"/>
        <ListItem_1.default myClassName="nav__item" url="/timelog/1" linkText="Timelog"/>
        <ListItem_1.default myClassName="nav__item" url="/settings" linkText="Settings"/>
        <ListItem_1.default myClassName="nav__item" url="/logmeout" linkText="Log Out"/>
        <li className="nav__item">
          <span className="nav__user">
            (You are logged in as {_this.props.userEmail})
          </span>
        </li>
      </ul>);
        };
        return _this;
    }
    Header.prototype.render = function () {
        return (<header className="header">
        <div className="content-wrapper">{this.guestLinks()}</div>
      </header>);
    };
    return Header;
}(React.Component));
exports["default"] = Header;
