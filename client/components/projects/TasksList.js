import React from 'react';
import PropTypes from 'prop-types';

class TasksList extends React.Component {
  render() {
    const listItems = this.props.tasks.map(task => (
      <li className="projects-list-item" key={task._id}>
        {task.name}
      </li>
    ));
    return listItems;
  }
}

TasksList.defaultProps = {
  tasks: [],
};

TasksList.propTypes = {
  tasks: PropTypes.array,
};

export default TasksList;
