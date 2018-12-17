// @flow
import React from 'react';
import { formatTime } from '../../helpers';

type Props = {
  tasks: any[]
};

const Tasks = (props: Props): any =>
  props.tasks.map(item => (
    <p className="dashboard__item-task" key={item._id}>
      <span>
        <strong>{item.taskName}: </strong>
        <span>{formatTime(item.seconds)}</span>
      </span>
    </p>
  ));

export default Tasks;
