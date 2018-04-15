import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import ButtonsGroup from './ButtonsGroup';
import Spinner from '../layout/Spinner';
import { formatDate, formatTime } from '../../helpers';
import ProjectsSelect from '../projects/ProjectsSelect';

class Task extends React.Component {
  state = {
    editName: '',
    showInput: false,
    showTimer: false,
    spinner: false,
    categoryID: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ spinner: false });
    }
  }

  showTimer = () => {
    this.setState(state => ({
      showTimer: !state.showTimer,
    }));
  }

  handleNameInput = (e) => {
    this.setState({ editName: e.target.value });
  }

  handleShowInput = (name) => {
    this.setState({
      showInput: !this.state.showInput,
      editName: name,
    });
  }

  handleRenaming = (id, name, categoryID) => {
    this.props.handleRename(id, name, categoryID);
    this.setState({
      showInput: false,
      spinner: true
    });
  }

  handleEnterButton = (id, name) => {
    this.props.handleRename(id, name);
    this.setState({
      showInput: false,
      spinner: true
    });
  }

  changeSelect = (e) => {
    this.setState({
      categoryID: e.target.value
    });
  }

  render() {
    const { editName, showInput, showTimer, categoryID } = this.state;
    const { id, name, done, handleAddingTimeLog, projectId } = this.props;
    const TimerComponent = showTimer ? (
      <Timer
        key={`timer${id}`}
        id={id}
        taskName={name}
        project={projectId}
        handleAddingTimeLog={handleAddingTimeLog}
      />
    ) : null;
    const doneButtonValue = done ? 'undone' : 'done';
    const doneClass = done ? 'tasks__list-item--done' : 'tasks__list-item';
    const hideOrNot = showInput ? 'none' : '';
    const newDate = this.props.updated ? formatDate(this.props.updated) : '';
    const dateString = this.props.updated ? 'Done:' : '';

    if (this.state.spinner) {
      return <Spinner />;
    }

    return (
      <li className={`${doneClass}`}>
        <p style={{ display: hideOrNot }} className="tasks__list-name">
          <span>{name}</span>
          <span className="pretty-time">
            {formatTime(this.props.timeSpent)}
          </span>
        </p>
        {dateString !== '' ? (
          <span className="tasks__list-date">
            <strong>{dateString} </strong>
            {newDate}
          </span>
        ) : null}

        {showInput ? (
          <div className="tasks__list-input">
            <input
              type="text"
              onKeyPress={e => {
                if (e.charCode === 13) {
                  this.handleEnterButton(id, editName, categoryID);
                }
              }}
              value={editName}
              onChange={this.handleNameInput}
            />
            <ProjectsSelect
              parentID={this.state.categoryID}
              projects={this.props.projects}
              changeSelect={this.changeSelect}
            />
          </div>
        ) : null}

        <ButtonsGroup
          {...this.props}
          {...this.state}
          showTimer={this.showTimer}
          handleShowInput={this.handleShowInput}
          handleRenaming={() => this.handleRenaming(id, editName, categoryID)}
          doneButtonValue={doneButtonValue}
        />
        {done ? null : TimerComponent}
      </li>
    );
  }
}

Task.defaultProps = {
  updated: undefined,
  projectId: '',
  handleAddingTimeLog: null,
};

Task.propTypes = {
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
  taskDone: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  updated: PropTypes.string,
  timeSpent: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired,
  handleAddingTimeLog: PropTypes.func,
  projectId: PropTypes.string,
};

export default Task;
