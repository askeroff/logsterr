

import * as React from 'react';
import { Link } from 'react-router-dom';
import TimeAddForm from '../tasks/TimeAddForm';
import AddForm from './AddForm';
import MotivationBlock from './MotivationBlock';
import { formatTime } from '../../helpers';

interface Props {
  project: { _id: string, timeSpent: number, initialTime: number },
  pathname: string,
  handleAddingTimeToProject: (id: any, time: any) => void,
  handleNewTask: (task: any) => void,
  dashboardData: any
}

type State = {
  showForm: boolean,
  timeForm: boolean,
  newTaskInput: string
};

class ProjectInfo extends React.Component<Props, State> {
  state = {
    showForm: false,
    timeForm: false,
    newTaskInput: ''
  };

  showAddForm = () => {
    this.setState(state => ({
      showForm: !state.showForm
    }));
  };

  showAddTimeForm = () => {
    this.setState(state => ({
      timeForm: !state.timeForm
    }));
  };

  handleNewTaskInput = (e: React.MouseEvent<HTMLInputElement>) => {
    this.setState({
      newTaskInput: e.currentTarget.value
    });
  };

  displayTimeForm = () => {
    if (this.state.timeForm) {
      return (
        <TimeAddForm
          addProjectTime={this.props.handleAddingTimeToProject}
          from="project"
          formToggle={this.showAddTimeForm}
          project={this.props.project._id}
        />
      );
    }
    return null;
  };

  addTask = task => {
    this.props.handleNewTask({ name: task.name, project: task.project });
    this.setState({
      showForm: false,
      newTaskInput: ''
    });
  };

  displayAddForm = () => {
    if (this.state.showForm) {
      return (
        <AddForm
          inputValue={this.state.newTaskInput}
          className="form form__newtask"
          handleInput={this.handleNewTaskInput}
          clickHandler={e => {
            e.preventDefault();
            this.addTask({
              name: this.state.newTaskInput,
              project: this.props.project._id
            });
          }}
          labelName="Name"
        />
      );
    }
    return null;
  };

  render() {
    const addLinkText = this.state.showForm ? 'Hide The Form' : 'New Task';
    return (
      <div className="project__description">
        <div className="project__info">
          <h1 className="page-title">{this.props.project.name}</h1>
          <h3 className="page-title">
            <span className="pretty-time">
              Total: {formatTime(this.props.project.timeSpent)}
            </span>
          </h3>
          <div className="project__buttons">
            <button onClick={this.showAddForm} className="button--submit">
              {addLinkText}
            </button>
            <button
              onClick={this.showAddTimeForm}
              className="button--submit"
              title="Add Time To The Project"
            >
              Add Time
            </button>
          </div>
          {this.displayTimeForm()}
          {this.displayAddForm()}
        </div>
        <div className="project__motivation">
          <div className="motivation-paragraph">
            <p>
              You can checkout tasks you already done{' '}
              <Link to={`${this.props.pathname}/archive`}>here</Link>.
            </p>
            <MotivationBlock dashboardData={this.props.dashboardData} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectInfo;
