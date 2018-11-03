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
        <p className="dashboard__item-task" key={item._id}>
          <span>
            <strong>{item.name}: </strong>
            <span>{formatTime(item.seconds)}</span>
          </span>
        </p>
      );
    }
    return null;
  });

export default Tasks;
