// @flow
import React from 'react';
import { formatTime } from '../../helpers';

type Props = {
  initialTime: number,
  time: number,
  dashboardData: any
};
// ! TODO make it update real time
const MotivationBlock = (props: Props) => {
  let thisWeekString = '';
  let lastWeekString = '';
  let diffString = '';
  const { time, initialTime } = props;
  const initialDifference = Number(time) - Number(initialTime);
  const { dashboardData } = props;
  if (dashboardData.lastWeek && dashboardData.thisWeek) {
    const { lastWeek, thisWeek } = dashboardData;

    if (lastWeek && lastWeek.seconds) {
      lastWeekString = (
        <p>
          Last week you did <b>{formatTime(lastWeek.seconds)}</b> on this
          project.
        </p>
      );
    }
    if (thisWeek && thisWeek.seconds) {
      const difference = time - initialTime;
      thisWeekString = (
        <p>
          This week you did <b>{formatTime(thisWeek.seconds + difference)}</b>.
        </p>
      );
    }

    if (lastWeek && lastWeek.seconds && thisWeek && thisWeek.seconds) {
      const difference =
        lastWeek.seconds - initialDifference - thisWeek.seconds;
      if (difference > 0) {
        diffString = (
          <p>
            Do no less this week - <b>{formatTime(difference)}</b> to do
          </p>
        );
      } else {
        diffString = (
          <p>
            You did - <b>{formatTime(Math.abs(difference))}</b> more than last
            week!
          </p>
        );
      }
    }
  }

  return (
    <div>
      {lastWeekString} {thisWeekString} {diffString}
    </div>
  );
};

MotivationBlock.defaultProps = {
  initialTime: 0,
  time: 0
};

export default MotivationBlock;
