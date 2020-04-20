"use strict";
exports.__esModule = true;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Li = function (props) { return (<li className={props.myClassName}>
    <react_router_dom_1.Link onClick={props.trigger} to={props.url}>
      {props.linkText}
    </react_router_dom_1.Link>
  </li>); };
Li.defaultProps = {
    myClassName: '',
    url: '/',
    linkText: 'default text',
    trigger: function () { }
};
exports["default"] = Li;
