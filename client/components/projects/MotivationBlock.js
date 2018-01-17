import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../helpers';

const MotivationBlock = props => {
  let motivationString = '';
  let thisWeekString = '';

  const { dashboardData, projectId } = props;
  if (dashboardData.lastWeek && dashboardData.lastWeek.length !== 0) {
    const lastWeek = dashboardData.lastWeek.filter(
      item => item.id === projectId
    );
    const thisWeek = dashboardData.thisWeek.filter(
      item => item.id === projectId
    );
    if (thisWeek.length !== 0 && lastWeek.length !== 0) {
      const diff = lastWeek[0].time - thisWeek[0].time - props.seconds;
      if (diff < 0) {
        thisWeekString = (
          <span>And this week you did even more! Good job!</span>
        );
      } else {
        thisWeekString = (
          <span>
            Can you do more than last week? <b>{formatTime(diff)}</b> left
          </span>
        );
      }
    }

    if (lastWeek.length !== 0) {
      motivationString = (
        <p>
          Last week you did <b>{formatTime(lastWeek[0].time)}</b> on this
          project. {thisWeekString}
        </p>
      );
    }
  }

  return motivationString;
};

MotivationBlock.defaultProps = {
  projectId: '',
  dashboardData: {},
};

MotivationBlock.propTypes = {
  projectId: PropTypes.string,
  dashboardData: PropTypes.object,
};

export default MotivationBlock;
