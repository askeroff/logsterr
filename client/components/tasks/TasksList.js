// @flow

import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteTask, renameTask, toggleDone } from '../../actions/tasks';
import { addTimelog } from '../../actions/timelog';
import Spinner from '../layout/Spinner';
import Task from './task/Task';
import { ITask, IProject } from '../../types';
import { IRenameTask, ITimeLogData } from '../../actions/actions.types';

type TasksListProps = {
  tasks: ITask[],
  handleDeleting: (id: string) => void,
  projectId: string,
  projects: IProject[],
  filter: boolean,
  handleEditing: (params: IRenameTask) => void,
  handleDone: (id: string) => void,
  handleAddingTimeLog: (data: ITimeLogData, seconds: number) => void,
};

type TasksListState = {
  spinner: boolean,
  optionsValues: boolean[]
}

class TasksList extends React.Component<TasksListProps, TasksListState> {
  static defaultProps = {
    tasks: [],
    filter: false,
  };

  state = {
    spinner: true,
    optionsValues: [true, false],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ spinner: false });
    }
  }

  handleChangeOptions = arr => {
    this.setState({
      optionsValues: [...arr],
    });
  };

  handleTaskDelete = id => {
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
  };

  mapItems(items) {
    if (items.length === 0) {
      return <li>No tasks yet</li>;
    }

    return items.map(task => (
      <Task
        key={task._id}
        id={task._id}
        name={task.name}
        done={task.done}
        optionsValues={this.state.optionsValues}
        handleChangeOptions={this.handleChangeOptions}
        projects={this.props.projects}
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
      result = (
        <ul className="tasks__list--done">{this.mapItems(doneItems)}</ul>
      );
    }

    return this.state.spinner ? <Spinner /> : result;
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  projects: state.projects,
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
