"use strict";
exports.__esModule = true;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Pagination = function (props) {
    var prevLink = null;
    var nextLink = null;
    var page = props.page, pages = props.pages, count = props.count;
    if (page > 1) {
        prevLink = <react_router_dom_1.Link to={"/timelog/" + (page - 1)}>Prev</react_router_dom_1.Link>;
    }
    if (page < pages) {
        nextLink = <react_router_dom_1.Link to={"/timelog/" + (parseFloat(page) + 1)}>Next</react_router_dom_1.Link>;
    }
    return (<div className="pagination">
      <span>{prevLink}</span>
      <span>
        Page {page} of {pages} — {count} total results
      </span>
      <span>{nextLink}</span>
    </div>);
};
exports["default"] = Pagination;
