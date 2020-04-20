"use strict";
exports.__esModule = true;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Index_1 = require("./Index");
var Project_1 = require("./Project");
var Archive_1 = require("../tasks/Archive");
var ProjectsRoutes = function (_a) {
    var match = _a.match;
    return (<react_router_dom_1.Switch>
    <react_router_dom_1.Route exact path={match.url} render={function () { return <Index_1.default />; }}/>
    <react_router_dom_1.Route path={match.url + "/:id/archive"} component={Archive_1["default"]}/>
    <react_router_dom_1.Route path={match.url + "/:id"} component={Project_1["default"]}/>
  </react_router_dom_1.Switch>);
};
exports["default"] = ProjectsRoutes;
