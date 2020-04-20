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
var sweetalert_1 = require("sweetalert");
var Layout_1 = require("./layout/Layout");
var Spinner_1 = require("./layout/Spinner");
var Pagination_1 = require("./layout/Pagination");
var TimelogItem_1 = require("./TimelogItem");
var timelog_1 = require("../actions/timelog");
var Timelog = /** @class */ (function (_super) {
    __extends(Timelog, _super);
    function Timelog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleLogDelete = function (id) {
            sweetalert_1["default"]({
                title: 'Are you sure?',
                text: 'Once deleted, the data will be gone',
                icon: 'warning',
                buttons: true,
                dangerMode: true
            }).then(function (willDelete) {
                if (willDelete) {
                    _this.props.handleDelete(id);
                }
            });
        };
        return _this;
    }
    Timelog.prototype.componentDidMount = function () {
        this.props.clearLogsList();
        this.props.handleGetLogs(this.props.match.params.page);
    };
    Timelog.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.match.params.page !== nextProps.match.params.page) {
            this.props.handleGetLogs(nextProps.match.params.page);
        }
    };
    Timelog.prototype.render = function () {
        var _this = this;
        var logs = null;
        var pagination = null;
        if (this.props.timelogs && this.props.timelogs.data) {
            logs = this.props.timelogs.data.map(function (item) {
                var project = item.projectdata[0]
                    ? item.projectdata[0].name
                    : 'Not found';
                var taskName = item.taskdata[0] ? item.taskdata[0].name : 'Not Found';
                return (<TimelogItem_1.default key={item._id} id={item._id} name={taskName} seconds={item.seconds} started={item.started} project={project} handleDelete={_this.handleLogDelete}/>);
            });
        }
        if (this.props.timelogs && this.props.timelogs.page) {
            var _a = this.props.timelogs, page = _a.page, pages = _a.pages, count = _a.count;
            pagination = (<Pagination_1.default page={parseInt(page, 10)} pages={pages} count={count}/>);
        }
        return (<Layout_1.default>
        <h1 className="page-title">History of your logged time</h1>
        {!this.props.timelogs.data ? <Spinner_1.default /> : null}
        <table className="timelogs">
          <tbody>
            <tr>
              <th className="timelogs__title">Project</th>
              <th className="timelogs__title">Task</th>
              <th className="timelogs__title">Time</th>
              <th className="timelogs__title">Date</th>
              <th className="timelogs__title">&nbsp;</th>
            </tr>
            {logs}
          </tbody>
        </table>
        {pagination}
      </Layout_1.default>);
    };
    return Timelog;
}(React.Component));
Timelog.defaultProps = {
    timelogs: {
        data: []
    }
};
Timelog.propTypes = {
    handleGetLogs: prop_types_1["default"].func.isRequired,
    clearLogsList: prop_types_1["default"].func.isRequired,
    handleDelete: prop_types_1["default"].func.isRequired,
    timelogs: prop_types_1["default"].object,
    match: prop_types_1["default"].object.isRequired
};
var mapStateToProps = function (state) { return ({
    timelogs: state.timelog
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleGetLogs: function (page) {
        dispatch(timelog_1.getLogs(page));
    },
    clearLogsList: function () {
        dispatch(timelog_1.clearLogs());
    },
    handleDelete: function (id) {
        dispatch(timelog_1.deleteLog(id));
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Timelog);
