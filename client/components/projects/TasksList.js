import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteTask, renameTask } from '../../actions/projects';
import RenameTask from './RenameTask';

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: '',
    };
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleRenaming = this.handleRenaming.bind(this);
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

  handleRenaming(id, name) {
    this.props.handleEditing(id, name);
  }

  handleNameInput(e) {
    this.setState({ editName: e.target.value });
  }

  handleShowingRenamingForm() {
    console.log('allegedly showing hiding something');
  }

  render() {
    const listItems = this.props.tasks.map(task => (
      <li className="projects-list-item" key={task._id}>
        {task.name}{' '}
        <button onClick={this.handleShowingRenamingForm} className="edit sign">
          Rename
        </button>
        <button
          onClick={() => this.handleTaskDelete(task._id)}
          className="delete sign"
        >
          &#9746;
        </button>
        <RenameTask
          inputValue={this.state.editName}
          handleInput={this.handleNameInput}
          handleSubmit={() =>
            this.handleRenaming(task._id, this.state.editName)}
        />
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
  handleEditing: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
