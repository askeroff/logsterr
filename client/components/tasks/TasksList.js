import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteTask, renameTask, toggleDone } from '../../actions/tasks';
import { addTimelog } from '../../actions/timelog';
import Spinner from '../layout/Spinner';
import Task from './Task';

class TasksList extends React.Component {
  state = {
    spinner: true
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ spinner: false });
    }
  }

  handleTaskDelete = (id) => {
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

  mapItems(items) {
    console.log(this.state);
    if (items.length === 0) {
      return <li>No tasks yet</li>;
    }

    return items.map(task => (
      <Task
        key={task._id}
        id={task._id}
        name={task.name}
        done={task.done}
        handleDelete={this.handleTaskDelete}
        handleRename={this.props.handleEditing}
        handleAddingTimeLog={this.props.handleAddingTimeLog}
        projectId={this.props.projectId}
        taskDone={this.props.handleDone}
        timeSpent={task.timeSpent}
      />
    ));
  }

  render() {
    const doneItems = this.props.tasks.filter(task => task.done);
    const undoneItems = this.props.tasks.filter(task => !task.done);
    let result = null;

    result = <ul className="tasks__list">{this.mapItems(undoneItems)}</ul>;

    if (this.props.filter) {
      result = <ul className="tasks__list--done">{this.mapItems(doneItems)}</ul>;
    }

    return this.state.spinner ? (<Spinner />) : result;
  }

}

TasksList.defaultProps = {
  tasks: [],
  filter: false,
};

TasksList.propTypes = {
  tasks: PropTypes.array,
  handleDeleting: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  filter: PropTypes.bool,
  handleEditing: PropTypes.func.isRequired,
  handleDone: PropTypes.func.isRequired,
  handleAddingTimeLog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tasks: state.tasks,
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
  handleAddingTimeLog(data, seconds) {
    dispatch(addTimelog(data, seconds));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
