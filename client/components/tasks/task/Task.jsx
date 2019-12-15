// @flow
import * as React from 'react';
// import Swal from 'sweetalert';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Timer from '../Timer';
import ButtonsGroup from '../ButtonsGroup';
import Spinner from '../../layout/Spinner';
import { formatDate, formatTime } from '../../../helpers';
import Input from './Input';
import TimeAddOptions from './TimeAddOptions';
import { IProject, IRenameTask, ITimeLogData } from '../../../types';

const MySwal = withReactContent(Swal);

type TaskProps = {
  name: string,
  handleDelete: (id: string) => void,
  handleRename: (params: IRenameTask) => void,
  taskDone: (id: string, projectId: string) => void,
  done: boolean,
  id: string,
  updated?: string,
  projectId: string,
  timeSpent: number,
  projects: { list: IProject[] },
  handleAddingTimeLog?: (data: ITimeLogData, seconds: number) => void
};

type TaskState = {
  editName: string,
  showInput: boolean,
  showTimer: boolean,
  spinner: boolean,
  categoryID: string
};

class Task extends React.Component<TaskProps, TaskState> {
  state: TaskState = {
    editName: '',
    showInput: false,
    showTimer: false,
    spinner: false,
    categoryID: this.props.projectId
  };

  getButtonProps = () => {
    const { id, name, done, taskDone, projectId } = this.props;
    const { editName, showInput, categoryID } = this.state;
    const doneButtonValue = done ? 'undone' : 'done';

    return {
      done,
      id,
      projectId,
      handleDelete: this.props.handleDelete,
      name,
      showInput,
      showTimer: this.handleShowTimer,
      handleShowInput: this.handleShowInput,
      handleRenaming: () =>
        this.handleRenaming({
          id,
          name: editName,
          newProject: categoryID
        }),
      doneButtonValue,
      taskDone
    };
  };

  setMovetimeRef = (element?: React$ElementRef<any>) => {
    this.moveTime = element;
  };

  setDeletetimeRef = (element?: React$ElementRef<any>) => {
    this.deleteTime = element;
  };

  deleteTime: ?HTMLInputElement = null;
  moveTime: ?HTMLInputElement = null;

  handleNameInput = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ editName: e.currentTarget.value });
  };

  handleShowInput = (name: string) => {
    this.setState({
      showInput: !this.state.showInput,
      editName: name
    });
  };

  handleRenaming = (params: IRenameTask) => {
    const { id, name, newProject } = params;
    if (this.props.projectId !== params.newProject) {
      MySwal.fire({
        title: 'Read the options!',
        type: 'warning',
        showCancelButton: true,
        html: (
          <TimeAddOptions
            setDeleteRef={this.setDeletetimeRef}
            setMoveRef={this.setMovetimeRef}
          />
        ),
        preConfirm: () => [this.moveTime.value, this.deleteTime.value]
      }).then(options => {
        if (options.value) {
          const moveTime = options.value[0] === 'true';
          const deleteTime = options.value[1] === 'true';
          this.props.handleRename({
            id,
            name,
            currentProject: this.props.projectId,
            timeSpent: this.props.timeSpent,
            newProject,
            moveTime,
            deleteTime
          });
        }
      });
    } else {
      this.props.handleRename({
        id,
        name,
        newProject,
        currentProject: this.props.projectId
      });
      this.setState({
        showInput: false
      });
    }
  };

  handleEnterButton = (id: string, name: string) => {
    this.handleRenaming({ id, name, newProject: this.state.categoryID });
    this.setState({
      showInput: false
    });
  };

  changeSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      categoryID: e.currentTarget.value
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

  shouldShowInput = (): ?React$Element<any> => {
    const { editName, categoryID } = this.state;
    const inputProps = {
      editName,
      categoryID,
      id: this.props.id,
      projects: this.props.projects.list,
      changeSelect: this.changeSelect,
      handleNameInput: this.handleNameInput,
      handleEnterButton: this.handleEnterButton
    };
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

  handleShowTimer = () => {
    this.setState(state => ({
      showTimer: !state.showTimer
    }));
  };

  render() {
    const { showInput } = this.state;
    const { name, done } = this.props;

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

        <ButtonsGroup {...this.getButtonProps()} />
        {this.shouldShowTimer()}
      </li>
    );
  }
}

export default Task;
