import * as React from 'react';
import swal from 'sweetalert';
import { TimeLogData } from '../../types';

interface Props {
  task: string,
  from: string,
  project: string,
  addProjectTime?: (projectID: string, seconds: number) => void,
  addTaskTime?: (data: TimeLogData, seconds: number) => void,
  formToggle: () => void
}

type State = {
  minutes: string,
  hours: string
};

class TimeAddForm extends React.Component<Props, State> {
  static defaultProps = {
    name: 'Not defined',
    from: 'task',
    task: ''
  };

  state = {
    minutes: '00',
    hours: '00'
  };

  handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      minutes: e.currentTarget.value
    });
  };

  handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      hours: e.currentTarget.value
    });
  };

  isNumber(n: number) {
    return !isNaN(n);
  }

  handleSubmit = () => {
    const { hours, minutes } = this.state;
    const {
      task,
      project,
      addTaskTime,
      addProjectTime,
      formToggle
    } = this.props;

    if (!this.isNumber(+hours) || !this.isNumber(+minutes)) {
      swal('Invalid', 'Provide only numbers', 'error');
      return null;
    }

    const hoursToSeconds = Number(hours) * 3600;
    const minutesToSeconds = Number(minutes) * 60;
    const result = hoursToSeconds + minutesToSeconds;

    if (result < 60) {
      swal('Invalid', 'Added time should be greater than one minute', 'error');
      return null;
    }

    if (typeof addProjectTime === 'function') {
      addProjectTime(project, result);
    } else if (typeof addTaskTime === 'function') {
      const data = {
        seconds: result,
        done: true,
        task,
        project
      };
      addTaskTime(data, result);
    }

    formToggle();
    swal('Wohoo!', 'Time has been added!', 'success');
    return result;
  };

  render() {
    const addClass =
      this.props.from === 'project' ? 'timer__addTimeForm-project' : '';
    return (
      <div className={`timer__addTimeForm ${addClass}`}>
        <label htmlFor="hours">HH</label>
        <input
          onChange={this.handleHoursChange}
          name="hours"
          type="text"
          className="timer__addTimeForm-input"
          value={this.state.hours}
        />
        <label htmlFor="minutes">MM</label>
        <input
          onChange={this.handleMinutesChange}
          name="minutes"
          type="text"
          className="timer__addTimeForm-input"
          value={this.state.minutes}
        />
        <input
          type="button"
          onClick={this.handleSubmit}
          className="timer__addTimeForm-submit"
          value="Ok"
        />
      </div>
    );
  }
}

export default TimeAddForm;
