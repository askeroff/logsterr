import React from 'react';
import PropTypes from 'prop-types';
import Timer from '../Timer';
import ButtonsGroup from '../ButtonsGroup';
import Spinner from '../../layout/Spinner';
import { formatDate, formatTime } from '../../../helpers';
import Input from './Input';

class Task extends React.Component {
  state = {
    editName: '',
    showInput: false,
    showTimer: false,
    spinner: false,
    categoryID: '',
  };

  componentWillMount() {
    this.setState({ categoryID: this.props.projectId });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ spinner: false });
    }
  }

  showTimer = () => {
    this.setState(state => ({
      showTimer: !state.showTimer,
    }));
  };

  handleNameInput = e => {
    this.setState({ editName: e.target.value });
  };

  handleShowInput = name => {
    this.setState({
      showInput: !this.state.showInput,
      editName: name,
    });
  };

  handleRenaming = (id, name, categoryID) => {
    this.props.handleRename(id, name, categoryID);
    this.setState({
      showInput: false,
      spinner: true,
    });
  };

  handleEnterButton = (id, name) => {
    this.props.handleRename(id, name);
    this.setState({
      showInput: false,
      spinner: true,
    });
  };

  changeSelect = e => {
    this.setState({
      categoryID: e.target.value,
    });
  };

  shouldShowTimer = () => {
    const { id, name, projectId, handleAddingTimeLog } = this.props;
    const myProps = Object.assign(
      {},
      { id, name, projectId, handleAddingTimeLog }
    );
    if (this.state.showTimer) {
      return <Timer key={`timer${id}`} {...myProps} />;
    }
    return null;
  };

  shouldShowInput = () => {
    const { editName, categoryID } = this.state;
    const inputProps = Object.assign({}, this.props, {
      editName,
      categoryID,
      changeSelect: this.changeSelect,
      handleNameInput: this.handleNameInput,
    });
    if (this.state.showInput) {
      return <Input {...inputProps} />;
    }
    return null;
  };

  showDateString = () => {
    const newDate = this.props.updated ? formatDate(this.props.updated) : '';
    const dateString = this.props.updated ? 'Done:' : '';
    if (dateString !== '') {
      return (
        <span className="tasks__list-date">
          <strong>{dateString} </strong>
          {newDate}
        </span>
      );
    }
    return null;
  };

  render() {
    const { editName, showInput, categoryID } = this.state;
    const { id, name, done } = this.props;

    const doneButtonValue = done ? 'undone' : 'done';
    const doneClass = done ? 'tasks__list-item--done' : 'tasks__list-item';
    const hideOrNot = showInput ? 'none' : '';

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
        {this.showDateString()}
        {this.shouldShowInput()}

        <ButtonsGroup
          {...this.props}
          {...this.state}
          showTimer={this.showTimer}
          handleShowInput={this.handleShowInput}
          handleRenaming={() => this.handleRenaming(id, editName, categoryID)}
          doneButtonValue={doneButtonValue}
        />
        {this.shouldShowTimer()}
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
