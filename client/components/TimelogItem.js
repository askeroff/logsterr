import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatTime } from '../helpers';

const TimelogItem = props => (
  <li className="projects-list-item">
    <strong>Date: {formatDate(props.started)} | </strong>
    <strong>Task: {props.name} | </strong>
    <strong>Time: ({formatTime(props.seconds)})</strong>
  </li>
);

TimelogItem.defaultProps = {
  started: '',
  name: '',
  seconds: 0,
};

TimelogItem.propTypes = {
  started: PropTypes.string,
  name: PropTypes.string,
  seconds: PropTypes.number,
};

export default TimelogItem;
