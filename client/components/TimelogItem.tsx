import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatTime } from '../helpers';

const TimelogItem = props => {
  const date = moment(new Date(props.started)).format('YYYY-MM-DD HH:mm');
  return (
    <tr key={`item-${props.id}`} className="timelogs__item">
      <td>{props.project}</td>
      <td>{props.name}</td>
      <td>{formatTime(props.seconds)}</td>
      <td title={date}>{(props.started && date.substr(0, 10)) || ''}</td>
      <td className="timelogs__deletecell">
        <button
          onClick={() => props.handleDelete(props.id)}
          className="timelogs__item-delete button--danger"
        >
          X
        </button>
      </td>
    </tr>
  );
};

TimelogItem.defaultProps = {
  started: '',
  name: '',
  seconds: 0,
  showDate: false
};

TimelogItem.propTypes = {
  started: PropTypes.string,
  name: PropTypes.string,
  // project: PropTypes.string,
  seconds: PropTypes.number,
  // showDate: PropTypes.bool,
  id: PropTypes.string.isRequired
};

export default TimelogItem;
