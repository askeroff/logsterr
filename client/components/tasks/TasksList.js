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
    if (nextProps.tasks.length !== this.props.tasks.length) {
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
    this.setState({ spinner: true });
  }

  render() {
    if (this.props.tasks.length === 0) return 'No tasks yet';
    let doneItems = this.props.tasks.filter(task => task.done);
    let undoneItems = this.props.tasks.filter(task => !task.done);
    let result = null;
    if (this.props.filter) {
      doneItems = doneItems.map(task => (
        <Task
          key={task._id}
          id={task._id}
          name={task.name}
          done={task.done}
          updated={task.updated}
          handleDelete={this.handleTaskDelete}
          handleRename={this.props.handleEditing}
          taskDone={this.props.handleDone}
          timeSpent={task.timeSpent}
        />
      ));

      result = <ul className="tasks__list--done">{doneItems}</ul>;
    }

    undoneItems = undoneItems.map(task => (
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

    result = <ul className="tasks__list">{undoneItems}</ul>;
    return (<div> {result} {this.state.spinner && (<Spinner />)} </div >);
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
