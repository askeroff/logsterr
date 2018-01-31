import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../helpers';

const MotivationBlock = props => {
  let motivationString = '';
  let thisWeekString = '';

  const { dashboardData, projectId } = props;
  console.log(props);
  if (dashboardData.lastWeek && dashboardData.lastWeek.length !== 0) {
    const lastWeek = dashboardData.lastWeek.find(item => item.id === projectId);
    const thisWeek = dashboardData.thisWeek.find(item => item.id === projectId);
    if (thisWeek !== undefined && lastWeek !== undefined) {
      const diff = lastWeek.time - thisWeek.time - props.seconds;
      console.log('difference', diff);
      console.log('last week', lastWeek);
      console.log('this week', thisWeek);
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

    if (lastWeek !== undefined) {
      motivationString = (
        <p>
          Last week you did <b>{formatTime(lastWeek.time)}</b> on this project.{' '}
          {thisWeekString}
        </p>
      );
    }
  }

  return motivationString;
};

MotivationBlock.defaultProps = {
  projectId: '',
  dashboardData: {},
  seconds: 0,
};

MotivationBlock.propTypes = {
  projectId: PropTypes.string,
  dashboardData: PropTypes.object,
  seconds: PropTypes.number,
};

export default MotivationBlock;
