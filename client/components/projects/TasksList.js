import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteTask, renameTask, toggleDone } from '../../actions/projects';
import Task from './Task';

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    // this.handleRename = this.handleRename.bind(this);
  }

  handleTaskDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this task',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        this.props.handleDeleting(id);
      }
    });
  }

  render() {
    const listItems = this.props.tasks.map(task => (
      <Task
        key={task._id}
        id={task._id}
        name={task.name}
        done={task.done}
        handleDelete={this.handleTaskDelete}
        handleRename={this.props.handleEditing}
        taskDone={this.props.handleDone}
      />
    ));
    return <ul>{listItems}</ul>;
  }
}

TasksList.defaultProps = {
  tasks: [],
};

TasksList.propTypes = {
  tasks: PropTypes.array,
  handleDeleting: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  handleDone: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tasksList: state.projects.tasksList,
});

const mapDispatchToProps = dispatch => ({
  handleDeleting(id) {
    dispatch(deleteTask(id));
  },
  handleEditing(id, name) {
    dispatch(renameTask(id, name));
  },
  handleDone(id) {
    dispatch(toggleDone(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
