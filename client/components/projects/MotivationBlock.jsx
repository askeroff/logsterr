"use strict";
exports.__esModule = true;
var React = require("react");
var helpers_1 = require("../../helpers");
var Spinner_1 = require("../layout/Spinner");
var MotivationBlock = function (props) {
    if (props.dashboardData.isFetching) {
        return <Spinner_1.default />;
    }
    var thisWeekString = '';
    var lastWeekString = '';
    var diffString = '';
    var dashboardData = props.dashboardData;
    if (dashboardData.lastWeek && dashboardData.thisWeek) {
        var lastWeek = dashboardData.lastWeek, thisWeek = dashboardData.thisWeek;
        if (lastWeek && lastWeek.seconds) {
            lastWeekString = (<p>
          Last week you did <b>{helpers_1.formatTime(lastWeek.seconds)}</b> on this
          project.
        </p>);
        }
        if (thisWeek && thisWeek.seconds) {
            thisWeekString = (<p>
          This week you did <b>{helpers_1.formatTime(thisWeek.seconds)}</b>.
        </p>);
        }
        if (lastWeek && lastWeek.seconds && thisWeek && thisWeek.seconds) {
            var difference = lastWeek.seconds - thisWeek.seconds;
            if (difference > 0) {
                diffString = (<p>
            Do no less this week - <b>{helpers_1.formatTime(difference)}</b> to do
          </p>);
            }
            else {
                diffString = (<p>
            You did - <b>{helpers_1.formatTime(Math.abs(difference))}</b> more than last
            week!
          </p>);
            }
        }
    }
    return (<div>
      {lastWeekString} {thisWeekString} {diffString}
    </div>);
};
MotivationBlock.defaultProps = {
    initialTime: 0,
    time: 0
};
exports["default"] = MotivationBlock;
