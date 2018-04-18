// @flow
import React from 'react';
import swal from 'sweetalert';
import Timer from '../Timer';
import ButtonsGroup from '../ButtonsGroup';
import Spinner from '../../layout/Spinner';
import { formatDate, formatTime } from '../../../helpers';
import Input from './Input';
import TimeAddOptionsNode from './TimeAddOptions';
import { IRenameTask } from '../../../actions/actions.types';

type Props = {
  name: string,
  handleDelete: (id: string) => void,
  handleRename: (params: IRenameTask) => void,
  taskDone: (id: string) => void,
  done: boolean,
  id: string,
  updated: string,
  projectId: string,
  timeSpent: number,
  projects: any[],
  handleAddingTimeLog: (data: any, seconds: number) => void,
};

class Task extends React.Component<Props> {
  static defaultProps = {
    updated: undefined,
    projectId: '',
    handleAddingTimeLog: null,
  };

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

  handleRenaming = (params: {
    id: string,
    name: string,
    currentProject: string,
    newProject: string,
    moveTime?: boolean,
    deleteTime?: boolean,
  }) => {
    const { id, editName, categoryID } = params;
    if (this.props.projectId !== params.categoryID) {
      swal({
        text: "You changing project's task. Read the options",
        content: TimeAddOptionsNode,
        buttons: {
          confirm: {
            value: { value: [true, false] },
          },
        },
      }).then(value => {
        this.props.handleRename({
          id,
          name: editName,
          currentProject: this.props.projectId,
          timeSpent: this.props.timeSpent,
          newProject: categoryID,
          moveTime: value.value[0],
          deleteTime: value.value[1],
        });
        this.setState({
          showInput: false,
          spinner: true,
        });
      });
    } else {
      this.props.handleRename({ id, name: editName, newProject: categoryID });
      this.setState({
        showInput: false,
        spinner: true,
      });
    }
  };

  handleEnterButton = (id, name) => {
    // TODO: fix rename calling
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
      { id, taskName: name, project: projectId, handleAddingTimeLog }
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
          handleRenaming={() =>
            this.handleRenaming({
              id,
              editName,
              categoryID,
            })
          }
          doneButtonValue={doneButtonValue}
        />
        {this.shouldShowTimer()}
      </li>
    );
  }
}

export default Task;
