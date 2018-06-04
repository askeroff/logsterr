// @flow
import React from 'react';
import { formatTime } from '../../helpers';

type Props = {
  tasks: any[]
};

const Tasks = (props: Props): any =>
  props.tasks.map(item => {
    if (item instanceof Object && item.constructor === Object) {
      return (
        <p className="dashboard__item-task" key={item.id}>
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
