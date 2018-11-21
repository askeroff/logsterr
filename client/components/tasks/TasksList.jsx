// @flow

import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteTask, renameTask, toggleDone } from '../../actions/tasks';
import { addTimelog } from '../../actions/timelog';
import Task from './task/Task';
import { ITask, IProject, IRenameTask, ITimeLogData } from '../../types';

type TasksListProps = {
  tasks: { list: ITask[] },
  handleDeleting: (id: string) => void,
  projectId: string,
  projects: { list: IProject[] },
  handleEditing: (params: IRenameTask) => void,
  handleDone: (id: string) => void,
  handleAddingTimeLog: (data: ITimeLogData, seconds: number) => void
};

class TasksList extends React.Component<TasksListProps> {
  static defaultProps = {
    tasks: [],
    filter: false
  };

  getTaskProps = task => ({
    id: task._id,
    name: task.name,
    done: task.done,
    projects: this.props.projects,
    handleDelete: this.handleTaskDelete,
    handleRename: this.props.handleEditing,
    handleAddingTimeLog: this.props.handleAddingTimeLog,
    projectId: this.props.projectId,
    taskDone: this.props.handleDone,
    timeSpent: task.timeSpent
  });

  handleTaskDelete = id => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this task',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.handleDeleting(id);
      }
    });
  };

  mapItems(items) {
    if (items.length === 0) {
      return <li>No tasks yet</li>;
    }
    return items.map(task => (
      <Task key={task._id} {...this.getTaskProps(task)} />
    ));
  }

  render() {
    const tasks = this.props.tasks.list;
    return <ul className="tasks__list">{this.mapItems(tasks)}</ul>;
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  handleDeleting(id) {
    dispatch(deleteTask(id));
  },
  handleEditing(params: IRenameTask) {
    dispatch(renameTask(params));
  },
  handleDone(id) {
    dispatch(toggleDone(id));
  },
  handleAddingTimeLog(data, seconds) {
    dispatch(addTimelog(data, seconds));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
