import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatTime } from '../helpers';

const Title = props => {
  if (props.show) {
    return (
      <li className="project-list-title timelog-title">
        {formatDate(props.title)}
      </li>
    );
  }
  return null;
};

const TimelogItem = props => [
  <Title
    show={props.showDate}
    title={props.started}
    key={`title-${props.id}`}
  />,
  <li key={`item-${props.id}`} className="projects-list-item">
    <div className="timelog-project">
      <strong>Project:</strong> <em>{props.project} </em>
    </div>
    <div className="timelog-name">
      <strong>Task:</strong> <em>{props.name}</em>
    </div>
    <div className="timelog-delete">
      <span className="timelog-item-span">
        <strong>Time:</strong> <em>{formatTime(props.seconds)}</em>
      </span>
      <button
        onClick={() => props.handleDelete(props.id)}
        className="danger-button link"
      >
        X
      </button>
    </div>
  </li>,
];

TimelogItem.defaultProps = {
  started: '',
  name: '',
  seconds: 0,
  showDate: false,
};

TimelogItem.propTypes = {
  started: PropTypes.string,
  name: PropTypes.string,
  project: PropTypes.string,
  seconds: PropTypes.number,
  showDate: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default TimelogItem;
