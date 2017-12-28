import React from 'react';
import { formatTime } from '../../helpers';

const Tasks = props =>
  props.tasks.map(item => {
    if (item instanceof Object && item.constructor === Object) {
      return (
        <p className="dashboard-item-task" key={item.id}>
          <span>
            <strong>{item.taskName}: </strong>
            <span>{formatTime(item.time)}</span>
          </span>
        </p>
      );
    }
    return null;
  });

export default Tasks;
