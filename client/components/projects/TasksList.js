import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteTask } from '../../actions/projects';

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
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
      <li className="projects-list-item" key={task._id}>
        {task.name}{' '}
        <button
          onClick={() => this.handleTaskDelete(task._id)}
          className="delete-sign"
        >
          &#9746;
        </button>
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
  handleDeleting: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tasksList: state.projects.tasksList,
});

const mapDispatchToProps = dispatch => ({
  handleDeleting(id) {
    dispatch(deleteTask(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
