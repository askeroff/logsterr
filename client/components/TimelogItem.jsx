"use strict";
exports.__esModule = true;
var React = require("react");
var prop_types_1 = require("prop-types");
var moment_1 = require("moment");
var helpers_1 = require("../helpers");
var TimelogItem = function (props) {
    var date = moment_1["default"](new Date(props.started)).format('YYYY-MM-DD HH:mm');
    return (<tr key={"item-" + props.id} className="timelogs__item">
      <td>{props.project}</td>
      <td>{props.name}</td>
      <td>{helpers_1.formatTime(props.seconds)}</td>
      <td title={date}>{(props.started && date.substr(0, 10)) || ''}</td>
      <td className="timelogs__deletecell">
        <button onClick={function () { return props.handleDelete(props.id); }} className="timelogs__item-delete button--danger">
          X
        </button>
      </td>
    </tr>);
};
TimelogItem.defaultProps = {
    started: '',
    name: '',
    seconds: 0,
    showDate: false
};
TimelogItem.propTypes = {
    started: prop_types_1["default"].string,
    name: prop_types_1["default"].string,
    // project: PropTypes.string,
    seconds: prop_types_1["default"].number,
    // showDate: PropTypes.bool,
    id: prop_types_1["default"].string.isRequired
};
exports["default"] = TimelogItem;
