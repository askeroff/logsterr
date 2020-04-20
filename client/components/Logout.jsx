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
var projects_1 = require("../actions/projects");
var tasks_1 = require("../actions/tasks");
var timelog_1 = require("../actions/timelog");
var Spinner_1 = require("./layout/Spinner");
var Logout = /** @class */ (function (_super) {
    __extends(Logout, _super);
    function Logout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Logout.prototype.componentDidMount = function () {
        this.props.clearProjectsList();
        this.props.clearLogsList();
        this.props.clearTasksList();
        this.props.logMeOut();
    };
    Logout.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.user.loggedIn === false &&
            this.props.match.path === '/logmeout') {
            this.props.history.push('/login');
        }
    };
    Logout.prototype.render = function () {
        return <Spinner_1.default />;
    };
    return Logout;
}(React.Component));
Logout.defaultProps = {
    user: {}
};
Logout.propTypes = {
    logMeOut: prop_types_1["default"].func.isRequired,
    clearProjectsList: prop_types_1["default"].func.isRequired,
    clearLogsList: prop_types_1["default"].func.isRequired,
    clearTasksList: prop_types_1["default"].func.isRequired,
    history: prop_types_1["default"].object.isRequired,
    user: prop_types_1["default"].object
};
var mapStateToProps = function (state) { return ({
    user: state.user
}); };
var mapDispatchToProps = function (dispatch) { return ({
    logMeOut: function () {
        dispatch(user_1.logOut());
    },
    clearProjectsList: function () {
        dispatch(projects_1.clearProjects());
    },
    clearTasksList: function () {
        dispatch(tasks_1.clearTasks());
    },
    clearLogsList: function () {
        dispatch(timelog_1.clearLogs());
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Logout);
