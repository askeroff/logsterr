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
var MessageItem_1 = require("./MessageItem");
var messages_1 = require("../../actions/messages");
var ShowMessages = /** @class */ (function (_super) {
    __extends(ShowMessages, _super);
    function ShowMessages() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            show: 'block'
        };
        _this.close = function (name) {
            _this.props.handleRemoveMessage(name);
        };
        return _this;
    }
    ShowMessages.prototype.render = function () {
        var _this = this;
        var messages = this.props.messages.map(function (item) { return (<MessageItem_1.default key={item.name} id={item.name} close={function () { return _this.close(item.name); }} message={item.message} type={item.type}/>); });
        return messages;
    };
    ShowMessages.defaultProps = {
        messages: [],
        handleRemoveMessage: null
    };
    return ShowMessages;
}(React.Component));
var mapStateToProps = function (state) { return ({
    messages: state.messages
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleRemoveMessage: function (name) {
        dispatch(messages_1.removeMessage(name));
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ShowMessages);
